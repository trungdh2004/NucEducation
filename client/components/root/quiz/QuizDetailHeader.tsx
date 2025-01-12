import { lessonLiveApi } from "@/actions/lesson.action";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TooltipComponent from "@/components/common/TooltipComponent";
import Logo from "@/components/root/header/Logo";
import { Button } from "@/components/ui/button";
import { getRank } from "@/config/rank.config";
import { IQuizResponse } from "@/types/quizz.type";
import {
  LoaderIcon,
  NotebookPenIcon,
  PlayIcon
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface IProps {
  quiz: IQuizResponse;
  handleDelete: () => void;
  handleLoved: (isLove: boolean) => void;
  handlePublic: () => void;
  isAdmin?: boolean;
}

const QuizDetailHeader = ({ quiz, handleDelete, isAdmin = false }: IProps) => {
  const router = useRouter();
  const [openConfirm, setOpenConfirm] = useState(false);
  const [isPending, setTransition] = useTransition();

  const handleCreateLiveLesson = async () => {
    setTransition(async () => {
      try {
        const data = await lessonLiveApi({
          name: quiz.name,
          type: "live",
          quizId: quiz._id,
          quizName: quiz.name,
        });

        router.push(`/fullScreen/activity/${data._id}`);
      } catch (error: unknown) {
        console.log("err lesson live", error);
      }
    });
  };

  return (
    <>
      <div className="w-full p-3 sm:p-4 md:p-6 rounded-md bg-white border box-shadow sticky top-14">
        <div className="flex  items-center justify-start gap-3 flex-nowrap mb-4">
          <div className="size-16 sm:size-20 rounded-md overflow-hidden flex-shrink-0">
            {quiz?.image ? (
              <Image
                src={quiz?.image}
                alt="avatar"
                width={80}
                height={80}
                className="object-cover w-full h-full"
              />
            ) : (
              <TooltipComponent label="Chưa có ảnh bìa">
                <Logo className="size-20" />
              </TooltipComponent>
            )}
          </div>

          <div className="flex justify-start items-stretch flex-col flex-nowrap gap-2">
            <div className="flex gap-2 justify-start items-center flex-row flex-nowrap">
              <h1 className="font-semibold text-base sm:text-xl line-clamp-1">
                {quiz.name}
              </h1>
            </div>

            <div className="flex gap-2 mt-1 mr-0 mb-0 ml-0 justify-start items-center flex-row flex-wrap">
              <div className=" gap-2 justify-start items-center flex-row flex-nowrap hidden sm:flex">
                <div className="size-6 rounded-full bg-green-600 text-white flex items-center justify-center">
                  <NotebookPenIcon size={14} />
                </div>

                <div className="flex items-center text-xs text-slate-600 gap-1">
                  <span className="text-sm">Đánh giá</span>
                </div>
              </div>

              <p className="size-1 rounded-full bg-black hidden sm:block"></p>

              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden mr-3">
                  <Image
                    src={quiz?.createBy?.avatar || "/avatar.jpg"}
                    alt="avatar"
                    width={20}
                    height={20}
                    className="object-cover sm:w-6 sm:h-6"
                  />
                </div>

                <div className="flex items-center text-xs text-slate-600 gap-1">
                  <span className="text-xs sm:text-sm">
                    {quiz?.createBy?.name}
                  </span>
                </div>
              </div>

              {quiz?.category?.name && (
                <div className="flex items-center gap-2">
                  <p className="size-1 rounded-full bg-black"></p>

                  <div className="flex items-center text-slate-600 gap-1 text-xs sm:text-sm">
                    {quiz.category.name}
                  </div>
                </div>
              )}

              {quiz?.level && (
                <div className=" items-center gap-2 hidden sm:flex">
                  <p className="size-1 rounded-full bg-black"></p>

                  <div className="flex items-center text-slate-600 gap-1 text-xs sm:text-sm">
                    {getRank(quiz.level)?.name}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex sm:items-center justify-between flex-col gap-2 sm:flex-row">
          <div></div>

          {!isAdmin && (
            <div className="flex items-center gap-2">
              <Button
                variant={"success"}
                onClick={() => {
                  handleCreateLiveLesson();
                }}
              >
                {isPending ? (
                  <LoaderIcon className="animate-spin" />
                ) : (
                  <PlayIcon />
                )}
                Bắt đầu
              </Button>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        handleClose={() => setOpenConfirm(false)}
        handleSubmit={handleDelete}
        title="Xác nhận xóa"
        description="Bạn có chắc chắn muốn xóa bài viết này không"
      />
    </>
  );
};

export default QuizDetailHeader;
