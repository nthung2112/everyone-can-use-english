import { useEffect, useState, useContext } from "react";
import { AppSettingsProviderContext } from "@renderer/context";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Button,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  toast,
} from "@renderer/components/ui";
import { ChevronDownIcon, ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import {
  PronunciationAssessmentCard,
  RecordingDetail,
} from "@renderer/components";

export default () => {
  const navigate = useNavigate();
  const { EnjoyApp } = useContext(AppSettingsProviderContext);
  const [assessments, setAssessments] = useState<PronunciationAssessmentType[]>(
    []
  );
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [orderBy, setOrderBy] = useState<string>("createdAtDesc");
  const [selecting, setSelecting] =
    useState<PronunciationAssessmentType | null>(null);
  const [deleting, setDeleting] = useState<PronunciationAssessmentType | null>(
    null
  );

  const handleDelete = async (assessment: PronunciationAssessmentType) => {
    try {
      await EnjoyApp.pronunciationAssessments.destroy(assessment.id);
      setAssessments(assessments.filter((a) => a.id !== assessment.id));
      setDeleting(null);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const fetchAssessments = (params?: { offset: number; limit?: number }) => {
    const { offset = 0, limit = 10 } = params || {};
    if (offset > 0 && !hasMore) return;

    let order = ["createdAt", "DESC"];
    switch (orderBy) {
      case "createdAtDesc":
        order = ["createdAt", "DESC"];
        break;
      case "createdAtAsc":
        order = ["createdAt", "ASC"];
        break;
      case "scoreDesc":
        order = ["pronunciationScore", "DESC"];
        break;
      case "scoreAsc":
        order = ["pronunciationScore", "ASC"];
        break;
    }

    EnjoyApp.pronunciationAssessments
      .findAll({
        limit,
        offset,
        order: [order],
      })
      .then((fetchedAssessments) => {
        if (offset === 0) {
          setAssessments(fetchedAssessments);
        } else {
          setAssessments([...assessments, ...fetchedAssessments]);
        }
        setHasMore(fetchedAssessments.length === limit);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  useEffect(() => {
    fetchAssessments();
  }, [orderBy]);

  return (
    <div className="h-full px-4 py-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex space-x-1 items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-5 h-5" />
          </Button>
          <span>{t("sidebar.pronunciationAssessment")}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="">
            <div className="flex items-center gap-2">
              <Label className="min-w-max">{t("sortBy")}:</Label>
              <Select value={orderBy} onValueChange={setOrderBy}>
                <SelectTrigger>
                  <SelectValue placeholder={t("select_sort_order")} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="createdAtDesc">
                      {t("createdAtDesc")}
                    </SelectItem>
                    <SelectItem value="createdAtAsc">
                      {t("createdAtAsc")}
                    </SelectItem>
                    <SelectItem value="scoreDesc">{t("scoreDesc")}</SelectItem>
                    <SelectItem value="scoreAsc">{t("scoreAsc")}</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button onClick={() => navigate("/pronunciation_assessments/new")}>
            {t("newAssessment")}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          {assessments.map((assessment) => (
            <PronunciationAssessmentCard
              key={assessment.id}
              pronunciationAssessment={assessment}
              onSelect={setSelecting}
              onDelete={setDeleting}
            />
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center">
            <Button
              variant="secondary"
              onClick={() => fetchAssessments({ offset: assessments.length })}
            >
              {t("loadMore")}
            </Button>
          </div>
        )}
      </div>

      <Sheet
        open={Boolean(selecting)}
        onOpenChange={(value) => {
          if (!value) setSelecting(null);
        }}
      >
        <SheetContent
          aria-describedby={undefined}
          side="bottom"
          className="rounded-t-2xl shadow-lg max-h-screen overflow-y-scroll"
          displayClose={false}
        >
          <SheetHeader className="flex items-center justify-center -mt-4 mb-2">
            <SheetClose>
              <ChevronDownIcon />
            </SheetClose>
          </SheetHeader>
          {selecting && (
            <RecordingDetail
              recording={selecting.target}
              pronunciationAssessment={selecting}
            />
          )}
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={Boolean(deleting)}
        onOpenChange={(value) => {
          if (!value) setDeleting(null);
        }}
      >
        <AlertDialogContent aria-describedby={undefined}>
          <AlertDialogHeader>
            <AlertDialogTitle>{t("delete")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("areYouSureToDeleteThisAssessment")}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("cancel")}</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(deleting)}>
              {t("confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
