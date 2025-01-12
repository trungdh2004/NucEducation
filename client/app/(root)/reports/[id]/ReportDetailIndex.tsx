"use client";
import { detailLessonApi, endLessonApi } from "@/actions/lesson.action";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ILessonQuestion, LessonResponseReview } from "@/types/lesson.type";
import { PlayerResponse } from "@/types/player.type";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CirclePlayIcon,
  ListCheck,
  TargetIcon,
} from "lucide-react";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";
import PlayerContent from "./PlayerContent";
import ReportsJoin from "./ReportsJoin";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import Link from "next/link";

const QuestionContent = dynamic(() => import("./QuestionContent"), {
  ssr: false,
});

const ReportDetailIndex = ({ id }: { id: string }) => {
  const [lesson, setLesson] = useState<LessonResponseReview>();
  const [question, setQuestion] = useState<ILessonQuestion[]>([]);
  const [player, setPlayer] = useState<PlayerResponse[]>([]);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleRequest = useCallback(async (id: string) => {
    try {
      const data = await detailLessonApi(id);
      setLesson(data.lesson);
      setQuestion(data.lessonQuestion);
      setPlayer(data.player);
    } catch (error: unknown) {
      console.log("error: ", error);
    }
  }, []);

  useEffect(() => {
    handleRequest(id);
  }, [id]);

  const handlePercent = (value: number, totalValue: number) => {
    return Math.floor((value * 100) / totalValue);
  };

  const handleEndLesson = async () => {
    try {
      await endLessonApi(id);
      toast.success("Kết thúc thành công");
      handleRequest(id);
    } catch (error: unknown) {
      console.log("erorr: ", error);
    }
  };

  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-between py-2 px-2 md:px-4">
        <div className="flex items-center justify-start flex-wrap">
          <h2 className="text-xl font-semibold ">{lesson?.name}</h2>

          <div className="px-3 flex items-center py-1 border rounded-sm ml-4 text-xs  bg-white gap-2">
            <div
              className={cn(
                "size-2 rounded-full bg-red-500",
                lesson?.inRunning && "bg-green-500"
              )}
            ></div>
            <span className="">
              {lesson?.inRunning ? "Đang chạy" : "Hoàn thành"}
            </span>
          </div>
        </div>
        {lesson?.inRunning && (
          <div
            className="px-3 py-1 rounded text-xs border bg-rose-200 text-rose-500 border-rose-500 cursor-pointer"
            onClick={() => {
              setOpenConfirm(true);
            }}
          >
            Kết thúc
          </div>
        )}
      </header>

      <section className="w-full pb-3 px-2 md:px-4">
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <span>
            <CalendarDaysIcon size={12} />
          </span>
          <span>Đã bắt đầu :</span>
          <span>
            {lesson?.startAt && format(lesson?.startAt, "HH:mm dd/MM/yyyy")}
          </span>
          {lesson?.endedAt && (
            <span>
              - {lesson?.endedAt && format(lesson?.endedAt, "HH:mm dd/MM/yyyy")}
            </span>
          )}
        </div>
      </section>

      <div className="grid grid-cols-12 max-w-7xl gap-4 md:gap-6 p-2 md:p-4 h-fit relative">
        {lesson?.inRunning && <ReportsJoin lesson={lesson} />}

        <div className="col-span-full flex flex-col justify-center bg-white border rounded-lg">
          <div className="w-full py-2 sm:py-4 px-2 sm:px-4 md:px-6 flex  border-b bg-gray-50 rounded-t-lg justify-between">
            <div
              className={cn(
                "flex items-center border-l-4 rounded max-h-min text-[10px] max-w-[150px] px-3 py-2 overflow-ellipsis whitespace-nowrap async bg-green-200 border-green-500 text-green-600",
                lesson?.type === "always" &&
                  "bg-violet-200 border-violet-500 text-violet-600"
              )}
            >
              <ListCheck size={14} className="mr-2" />
              <span className="text-xs leading-3">
                {lesson?.type === "always" ? "Luôn luôn" : "Trực tiếp"}
              </span>
            </div>

            <Link
              href={`/diversity/view/${lesson?.quizId}`}
              className="px-3 py-2 rounded border text-sm bg-gray-100 cursor-pointer"
            >
              Xem câu hỏi
            </Link>
          </div>
          <div className=" w-full bg-white  rounded-b-lg">
            <div className="p-2 sm:p-4 grid grid-cols-2 md:grid-cols-4 gap-4 ">
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-10 md:size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <TargetIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">
                    {lesson?.totalCorrect &&
                      handlePercent(lesson.totalCorrect, lesson.totalAnswers)}
                    %
                  </h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-10 md:size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CircleCheckIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Số câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">
                    {lesson?.totalCorrect}
                  </h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-10 md:size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CirclePlayIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Lượt chơi
                  </span>
                  <h4 className="text-xl font-semibold ">{player?.length}</h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-10 md:size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CircleHelpIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu hỏi
                  </span>
                  <h4 className="text-xl font-semibold ">
                    {lesson?.totalQuestions}
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col justify-center bg-white border rounded-lg overflow-hidden">
          <Tabs defaultValue="account" className="w-full bg-gray-50 rounded-lg">
            <TabsList className=" w-full  h-10 rounded-b-none justify-start flex items-center px-4 bg-white rounded-t-lg">
              <TabsTrigger
                value="account"
                className="border-b-4 rounded-none shadow-none border-transparent data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-blue-500 min-w-32"
              >
                Người chơi
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="border-b-4 rounded-none border-transparent data-[state=active]:bg-white data-[state=active]:text-foreground  data-[state=active]:border-blue-500 shadow-none data-[state=active]:shadow-none min-w-32"
              >
                Câu hỏi
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="account"
              className="w-full p-2 sm:p-4 md:p-6 bg-gray-50"
            >
              <PlayerContent
                players={player}
                totalQuestion={question?.length}
              />
            </TabsContent>
            <TabsContent
              value="password"
              className="w-full p-2 sm:p-4 md:p-6 bg-gray-50"
            >
              <QuestionContent questions={question} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <ConfirmDialog
        open={openConfirm}
        handleClose={() => {
          setOpenConfirm(false);
        }}
        handleSubmit={() => {
          handleEndLesson();
          setOpenConfirm(false);
        }}
        successLabel="Kết thúc"
        title="Kết thúc bài học"
        description="Bạn có chắc chắn muốn kết thúc bài học không"
      />
    </div>
  );
};

export default ReportDetailIndex;
