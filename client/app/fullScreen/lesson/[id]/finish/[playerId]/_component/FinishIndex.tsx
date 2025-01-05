"use client";
import { dataFinishPlayerApi } from "@/actions/player.action";
import { funcDisturDate } from "@/common/func";
import { Button } from "@/components/ui/button";
import { ILessonQuestion } from "@/types/lesson.type";
import { PlayerResponse } from "@/types/player.type";
import { CircleCheckBig, CircleHelp, CircleXIcon, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const FinishIndex = ({ id }: { id: string }) => {
  const [player, setPlayer] = useState<PlayerResponse | null>();
  const [questions, setQuestions] = useState<ILessonQuestion[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await dataFinishPlayerApi(id);
        setPlayer(data.player);
        setQuestions(data.questions);
      } catch (error: unknown) {
        console.error(error);
      }
    })();
  }, [id]);
  return (
    <div className="w-full h-full flex justify-center pt-16">
      <div className="max-w-xl w-full p-4 rounded-md bg-gray-600/70 space-y-2">
        <div className="w-full p-2 text-center flex items-center justify-center bg-black/80 text-white rounded-md">
          <span className="font-semibold text-lg">{player?.name}</span>
        </div>

        <div className="w-full h-20 rounded-md bg-black/80 p-2">
          <p className="text-gray-500">Câu đúng</p>

          <div className="mt-2 w-full h-2 rounded-full relative bg-rose-500">
            <div
              className="w-2/4 h-full bg-green-300 rounded-full"
              style={{
                width: `${
                  ((player?.totalCorrect || 0) / questions.length) * 100
                }%`,
              }}
            ></div>
            <div
              className="absolute px-2 py-1 text-xs bg-white border rounded-sm top-1/2 left-2/4 -translate-y-1/2 -translate-x-1/2"
              style={{
                left: `${
                  ((player?.totalCorrect || 0) / questions.length) * 100
                }%`,
              }}
            >
              {Math.floor(
                ((player?.totalCorrect || 0) / questions.length) * 100
              )}
              %
            </div>
          </div>
        </div>

        <div className="">
          <p className="text-center text-gray-200">Số liệu thống kê</p>

          <div className="mt-2 grid grid-cols-2 gap-2">
            <div className="w-full h-20 bg-black/80 rounded-md relative flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute opacity-60 text-yellow-500 -bottom-4 -left-5">
                <CircleHelp size={80} />
              </div>
              <h4 className="text-center text-white text-3xl font-bold">
                {player?.totalQuestionAnswer || 0}
              </h4>
              <p className="text-sm text-gray-300">Câu trả lời</p>
            </div>
            <div className="w-full h-20 bg-black/80 rounded-md relative flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute opacity-60 text-green-500 -bottom-4 -left-5">
                <CircleCheckBig size={80} />
              </div>
              <h4 className="text-center text-white text-3xl font-bold">
                {player?.totalCorrect || 0}
              </h4>
              <p className="text-sm text-gray-300">Câu đúng</p>
            </div>
            <div className="w-full h-20 bg-black/80 rounded-md relative flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute opacity-60 text-rose-500 -bottom-4 -left-5">
                <CircleXIcon size={80} />
              </div>
              <h4 className="text-center text-white text-3xl font-bold">
                {player?.totalWrong || 0}
              </h4>
              <p className="text-sm text-gray-300">Câu sai</p>
            </div>
            <div className="w-full h-20 bg-black/80 rounded-md relative flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute opacity-60 text-blue-500 -bottom-4 -left-5">
                <Clock size={80} />
              </div>
              <h4 className="text-center text-white text-3xl font-bold">
                {player?.startPlay &&
                  player?.endPlay &&
                  funcDisturDate(
                    new Date(player.startPlay),
                    new Date(player.endPlay)
                  )}
              </h4>
              <p className="text-sm text-gray-300">Thời gian/s</p>
            </div>
          </div>
        </div>

        <div className="p-2 bg-black/80">
          <Link href={"/"}>
            <Button className="w-full" size={"lg"}>
              Trờ về trang chủ
            </Button>
          </Link>
        </div>

        <div className="bg-black/80 rounded-md w-full p-2">
          <p className="text-center text-gray-200 mt-2 text-lg">
            Xem lại câu hỏi
          </p>

          <div className="mt-2 flex flex-col gap-2">
            {questions?.map((question, index) => (
              <div
                className="w-full border-l-4 rounded-md border-rose-500 bg-white p-2"
                key={question._id}
              >
                <div className="flex items-start gap-2">
                  {question?.query?.image && (
                    <div className="size-14">
                      <Image
                        src={question.query.image}
                        alt=""
                        width={60}
                        height={60}
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>
                  )}

                  <div className="flex-1 text-sm ">
                    <span>
                      {index + 1}.{question.query.text}
                    </span>
                  </div>
                </div>
                <div className="mt-2 border-t w-full flex flex-col gap-1 text-sm pt-2">
                  {question.type === "BLANK" ? (
                    <div>
                      <span className="px-2 py-1 rounded-md bg-gray-200">
                        Xin chào bạn
                      </span>
                    </div>
                  ) : (
                    <>
                      {question?.options?.map((option) => (
                        <div
                          className="flex items-start gap-1 py-1"
                          key={option._id}
                        >
                          <div className="size-4 rounded-full bg-gray-300"></div>
                          <span className="text-sm flex-1">{option.text}</span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishIndex;
