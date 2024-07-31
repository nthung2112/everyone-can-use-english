import { useState, useContext, useEffect } from "react";
import { useTranscribe } from "@renderer/hooks";
import {
  AISettingsProviderContext,
  AppSettingsProviderContext,
  DbProviderContext,
} from "@renderer/context";
import { toast } from "@renderer/components/ui";
import { TimelineEntry } from "echogarden/dist/utilities/Timeline.d.js";
import { MAGIC_TOKEN_REGEX, END_OF_SENTENCE_REGEX } from "@/constants";

export const useTranscriptions = (media: AudioType | VideoType) => {
  const { whisperConfig } = useContext(AISettingsProviderContext);
  const { EnjoyApp, learningLanguage } = useContext(
    AppSettingsProviderContext
  );
  const { addDblistener, removeDbListener } = useContext(DbProviderContext);
  const [transcription, setTranscription] = useState<TranscriptionType>(null);
  const { transcribe, output } = useTranscribe();
  const [transcribingProgress, setTranscribingProgress] = useState<number>(0);
  const [transcribing, setTranscribing] = useState<boolean>(false);
  const [transcribingOutput, setTranscribingOutput] = useState<string>("");
  const [service, setService] = useState<
    WhisperConfigType["service"] | "upload"
  >(whisperConfig.service);

  const onTransactionUpdate = (event: CustomEvent) => {
    if (!transcription) return;

    const { model, action, record } = event.detail || {};
    if (
      model === "Transcription" &&
      record.id === transcription.id &&
      action === "update"
    ) {
      setTranscription(record);
    }
  };
  const findOrCreateTranscription =
    async (): Promise<TranscriptionType | void> => {
      if (!media) return;
      if (transcription?.targetId === media.id) return;

      return EnjoyApp.transcriptions
        .findOrCreate({
          targetId: media.id,
          targetType: media.mediaType,
        })
        .then((t) => {
          if (t.result && !t.result["timeline"]) {
            t.result = {
              originalText: t.result?.originalText,
            };
          }
          setTranscription(t);
          return t;
        })
        .catch((err) => {
          toast.error(err.message);
        });
    };

  const generateTranscription = async (params?: {
    originalText?: string;
    language?: string;
    service?: WhisperConfigType["service"] | "upload";
    isolate?: boolean;
  }) => {
    let {
      originalText,
      language = learningLanguage,
      service = whisperConfig.service,
      isolate = false,
    } = params || {};
    setService(service);
    setTranscribing(true);
    setTranscribingProgress(0);

    try {
      if (originalText === undefined) {
        if (transcription?.targetId === media.id) {
          originalText = transcription.result?.originalText;
        } else {
          const r = await findOrCreateTranscription();
          if (r) {
            originalText = r.result?.originalText;
          }
        }
      }
      const { engine, model, transcript, timeline, tokenId } = await transcribe(
        media.src,
        {
          targetId: media.id,
          targetType: media.mediaType,
          originalText,
          language,
          service,
          isolate,
        }
      );

      const processedTimeline = preProcessTranscription(timeline);
      if (media.language !== language) {
        if (media.mediaType === "Video") {
          await EnjoyApp.videos.update(media.id, {
            language,
          });
        } else {
          await EnjoyApp.audios.update(media.id, {
            language,
          });
        }
      }

      await EnjoyApp.transcriptions.update(transcription.id, {
        state: "finished",
        result: {
          timeline: processedTimeline,
          transcript,
          originalText,
          tokenId,
        },
        engine,
        model,
        language,
      });

      setTranscribing(false);
    } catch (err) {
      setTranscribing(false);
      toast.error(err.message);
    }
  };

  const preProcessTranscription = (timeline: TimelineEntry[]) => {
    /*
     * Pre-process
     * 1. Some words end with period should not be a single sentence, like Mr./Ms./Dr. etc
     * 2. Some words connected by `-`(like scrach-off) are split into multiple words in words timeline, merge them for display;
     * 3. Some numbers with `%` are split into `number + percent` in words timeline, merge them for display;
     */
    try {
      timeline.forEach((sentence, i) => {
        const nextSentence = timeline[i + 1];
        if (
          !sentence.text
            .replaceAll(MAGIC_TOKEN_REGEX, "")
            .match(END_OF_SENTENCE_REGEX) &&
          nextSentence?.text
        ) {
          nextSentence.text = [sentence.text, nextSentence.text].join(" ");
          nextSentence.timeline = [
            ...sentence.timeline,
            ...nextSentence.timeline,
          ];
          nextSentence.startTime = sentence.startTime;
          timeline.splice(i, 1);
        } else {
          const words = sentence.text.split(" ");

          sentence.timeline.forEach((token, j) => {
            const word = words[j]?.trim()?.toLowerCase();

            const match = word?.match(/-|%/);
            if (!match) return;

            if (
              word === "-" &&
              token.text.toLowerCase() === words[j + 1]?.trim()?.toLowerCase()
            ) {
              sentence.timeline.splice(j, 0, {
                type: "token",
                text: "-",
                startTime: sentence.timeline[j - 1]?.endTime || 0,
                endTime: sentence.timeline[j - 1]?.endTime || 0,
                timeline: [],
              });
              return;
            }

            for (let k = j + 1; k <= sentence.timeline.length - 1; k++) {
              while (word.includes(sentence.timeline[k]?.text?.toLowerCase())) {
                let connector = "";
                if (match[0] === "-") {
                  connector = "-";
                }
                token.text = [token.text, sentence.timeline[k].text].join(
                  connector
                );
                token.timeline = [
                  ...token.timeline,
                  ...sentence.timeline[k].timeline,
                ];
                token.endTime = sentence.timeline[k].endTime;
                sentence.timeline.splice(k, 1);
              }
              break;
            }
          });
        }
      });
    } catch (err) {
      console.warn(err);
      toast.warning(
        `Failed to pre-process transcription timeline: ${err.message}`
      );
    }
    return timeline;
  };

  /*
   * find or create transcription
   */
  useEffect(() => {
    if (!media) return;

    findOrCreateTranscription();
  }, [media]);

  /*
   * listen to transcription update
   */
  useEffect(() => {
    if (!transcription) return;

    addDblistener(onTransactionUpdate);
    return () => {
      removeDbListener(onTransactionUpdate);
    };
  }, [transcription]);

  /*
   * listen to transcribe progress
   */
  useEffect(() => {
    if (!transcribing) return;

    if (service === "local") {
      EnjoyApp.whisper.onProgress((_, p: number) => {
        if (p > 100) p = 100;
        setTranscribingProgress(p);
      });
    }

    EnjoyApp.app.onCmdOutput((_, output) => {
      setTranscribingOutput(output);
    });

    return () => {
      EnjoyApp.whisper.removeProgressListeners();
      EnjoyApp.app.removeCmdOutputListeners();
      setTranscribingOutput(null);
    };
  }, [media, service, transcribing]);

  const abortGenerateTranscription = () => {
    EnjoyApp.whisper.abort();
    setTranscribing(false);
  };

  return {
    transcription,
    transcribingProgress,
    transcribing,
    transcribingOutput: output || transcribingOutput,
    generateTranscription,
    abortGenerateTranscription,
  };
};
