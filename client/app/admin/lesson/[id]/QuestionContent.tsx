import { cn } from "@/lib/utils";
import { ILessonQuestion } from "@/types/lesson.type";
import Image from "next/image";
import React from "react";

const QuestionContent = ({ questions }: { questions: ILessonQuestion[] }) => {
  const handlePercent = (value: number, totalValue: number) => {
    return Math.floor((value * 100) / totalValue);
  };

  return (
    <div className=" flex flex-col gap-4">
      {questions?.map((question) => (
        <div
          className="w-full min-h-20 bg-white rounded-md border p-4"
          key={question._id}
        >
          <div className="pb-2 border-b flex items-center justify-between">
            <div>
              <span className="px-2 py-1 rounded-sm bg-gray-100 text-xs">
                {question.type === "BLANK"
                  ? "Điền đáp án"
                  : "Nhiều sự lựa chọn"}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-col">
              <p className="text-xs text-gray-500">Câu hỏi</p>
              <div className="flex items-center justify-start">
                {question.query.image && (
                  <div className="size-20 rounded-md border">
                    <Image
                      src={question.query.image}
                      alt=""
                      className="w-full h-full object-cover"
                      width={80}
                      height={80}
                    />
                  </div>
                )}
                <div className="flex  items-start text-base x ml-2">
                  <span>{question.query.text}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between flex-col md:flex-row">
              <div className="w-full">
                <div className="text-xs pb-2 font-semibold pt-4 text-gray-500">
                  Đáp án
                </div>

                {question?.options?.map((item) => (
                  <div className="flex py-2" key={item._id}>
                    <div
                      className={cn(
                        "rounded-full text-xs font-semibold border size-6 flex items-center justify-center mr-2 flex-shrink-0 bg-gray-100",
                        question.answer.includes(item.value) && "bg-green-500"
                      )}
                    ></div>

                    <div>
                      <p className=" leading-6 text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-l pl-6 ml-4 mt-6">
                <div className="w-60">
                  <div className="flex items-center text-xs text-gray-500 pb-1">
                    <span>Câu đúng</span>
                    <span className="font-semibold ml-auto">
                      {question.stats.totalCorrect} học sinh
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200 mb-4">
                    <div
                      className=" h-full bg-green-500 "
                      style={{
                        width: `${handlePercent(
                          question?.stats?.totalCorrect,
                          question?.stats?.totalAnswer
                        ) || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-60">
                  <div className="flex items-center text-xs text-gray-500 pb-1">
                    <span>Câu sai</span>
                    <span className="font-semibold ml-auto">
                      {question.stats.totalWrong} học sinh
                    </span>
                  </div>
                  <div className="w-full h-4 bg-gray-200">
                    <div
                      className="w-1/2 h-full bg-rose-500 "
                      style={{
                        width: `${handlePercent(
                          question?.stats?.totalWrong,
                          question?.stats?.totalAnswer
                        ) || 0}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionContent;
