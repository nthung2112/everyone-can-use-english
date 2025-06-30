import { app } from "electron";
import path from "path";
import { exec, spawn } from "child_process";
import fs from "fs-extra";
import os from "os";
import log from "@main/logger";
import snakeCase from "lodash/snakeCase";
import settings from "@main/settings";
import mainWin from "@main/window";

//  youtubedr bin file will be in /app.asar.unpacked instead of /app.asar
const __dirname = import.meta.dirname.replace("app.asar", "app.asar.unpacked");

const logger = log.scope("YOUTUBEDR");

type YoutubeInfoType = {
  title: string;
  id: string;
  author: string;
  duration: number;
  description: string;
  formats: {
    itag: number;
    fps: number;
    videoQuality: string;
    audioQuality: string;
    audioChannels: number;
    size: number;
    bitrate: number;
    mimeType: string;
  }[];
};

const validQueryDomains = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "music.youtube.com",
  "gaming.youtube.com",
]);

const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;

const ONE_MINUTE = 1000 * 60; // 1 minute
const TEN_MINUTES = 1000 * 60 * 10; // 10 minutes

class YoutubeDLP {
  private binFile: string;
  private abortController: AbortController | null = null;

  constructor() {
    this.binFile = path.join(
      __dirname,
      "lib",
      "yt-dlp",
      os.platform() === "win32" ? "yt-dlp.exe" : "yt-dlp"
    );
  }

  async autoDownload(url: string) {
    logger.debug("fetching video info", url);

    const info = await this.info(url);
    const filename = `${snakeCase(info.title)}.mp4`;
    const directory = settings.cachePath();

    return this.download(url, {
      quality: "",
      filename,
      directory,
    });
  }

  async download(
    url: string,
    options: {
      quality?: string | number;
      filename?: string;
      directory?: string;
      webContents?: Electron.WebContents;
    } = {}
  ): Promise<string> {
    this.abortController?.abort();
    this.abortController = new AbortController();

    const {
      quality,
      filename = this.getYtVideoId(url) + ".mp4",
      directory = app.getPath("downloads"),
      webContents = mainWin.win.webContents,
    } = options;

    return new Promise((resolve, reject) => {
      const proc = spawn(
        "yt-dlp",
        [
          "-f",
          "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]/best",
          "-o",
          `${directory}/${filename}`,
          url,
        ],
        {
          timeout: TEN_MINUTES,
          signal: this.abortController.signal,
          env: this.proxyEnv(),
        }
      );

      proc.stdout.on("data", (data) => {
        const output = data.toString();
        const match = output.match(/\[download\]\s+([\d.]+)%.*?at\s+([\d.]+MiB\/s)/);

        if (match) {
          const percent = match[1];
          const speed = match[2];

          webContents.send("download-on-state", {
            name: filename,
            state: "progressing",
            received: parseInt(percent),
            speed: speed,
          });
        }
      });

      proc.on("close", (code) => {
        if (code !== 0) {
          webContents.send("download-on-state", {
            name: filename,
            state: "interrupted",
          });
          return reject(new Error(`yt-dlp download failed with code: ${code}`));
        }

        if (fs.existsSync(path.join(directory, filename))) {
          const stat = fs.statSync(path.join(directory, filename));
          if (stat.size === 0) {
            reject(new Error("yt-dlp download failed: empty file"));
          } else {
            resolve(path.join(directory, filename));
          }
        } else {
          reject(new Error("yt-dlp download failed: unknown error"));
        }
      });
    });
  }

  async info(url: string): Promise<YoutubeInfoType> {
    const command = ["yt-dlp -j --skip-download", `"${url}"`].join(" ");
    return new Promise((resolve, reject) => {
      exec(
        command,
        {
          timeout: ONE_MINUTE,
          env: this.proxyEnv(),
        },
        (error, stdout, stderr) => {
          if (error) {
            logger.error(error);
            reject(error);
          }

          if (stderr) {
            logger.error(stderr);
            reject(new Error(stderr));
          }

          if (stdout) {
            // logger.debug(stdout);
            try {
              const info = JSON.parse(stdout);
              resolve(info);
            } catch (err) {
              logger.error("json result failed to parse", err);
              reject(stdout);
            }
          }

          reject(new Error("Youtubedr info failed: unknown error"));
        }
      );
    });
  }

  // ref: https://github.com/fent/node-ytdl-core/blob/master/lib/url-utils.js
  validateYtVideoId = (id: string) => {
    return /^[a-zA-Z0-9_-]{11}$/.test(id.trim());
  };

  getYtVideoId = (url: string) => {
    const parsed = new URL(url);
    let id = parsed.searchParams.get("v");
    if (validPathDomains.test(url.trim()) && !id) {
      const paths = parsed.pathname.split("/");
      id = parsed.host === "youtu.be" ? paths[1] : paths[2];
    } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
      throw Error("Not a YouTube domain");
    }
    if (!id) {
      throw Error(`No video id found: "${url}"`);
    }
    id = id.substring(0, 11);
    if (!this.validateYtVideoId(id)) {
      throw Error(`Invalid video id: "${id}"`);
    }

    return id;
  };

  validateYtURL = (url: string) => {
    try {
      this.getYtVideoId(url);
      return true;
    } catch (error) {
      logger.warn(error.message);
      return false;
    }
  };

  abortDownload() {
    this.abortController?.abort();
  }

  /**
   * Set the proxy environment variables
   * @returns env object
   */
  proxyEnv = () => {
    // keep current environment variables
    let env = { ...process.env };
    const proxyConfig = settings.getSync("proxy") as ProxyConfigType;
    if (proxyConfig.enabled && proxyConfig.url) {
      env["HTTP_PROXY"] = proxyConfig.url;
      env["HTTPS_PROXY"] = proxyConfig.url;
    }
    return env;
  };
}

export default new YoutubeDLP();
