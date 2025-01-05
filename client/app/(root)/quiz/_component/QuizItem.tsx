import { timeQuestion } from "@/config/appQuestion";
import { cn } from "@/lib/utils";
import { IQuestionResponse } from "@/types/question.type";
import { Check, CheckIcon, RectangleHorizontalIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

const QuizItem = ({ data }: { data: IQuestionResponse }) => {
  const checkCompiled = (value: number) => {
    const check = data.answer.includes(value);
    return check;
  };

  return (
    <div className="w-ful p-4 bg-white rounded-md border box-shadow">
      <div className="flex items-center justify-between">
        {data.type === "BLANK" ? (
          <div className="border rounded-sm p-1 flex items-center gap-1">
            <RectangleHorizontalIcon size={16} />
            <span className="text-xs">Điền vào chỗ trống</span>
          </div>
        ) : (
          <div className="border rounded-sm p-1 flex items-center gap-1">
            <CheckIcon size={16} />
            <span className="text-xs">Chọn đáp án đúng</span>
          </div>
        )}
        <div className="flex items-center gap-2">
          <div className="border rounded-sm p-1 text-xs hidden sm:block">
            {timeQuestion.find((time) => time.value === data.time)?.name}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-sm text-wrap">
          <strong>Câu hỏi:</strong> {data.query.text}
        </p>

        {data?.query?.image && (
          <div className="size-20 mt-2">
            <Image
              src={data.query.image}
              alt="image quiz"
              width={100}
              height={100}
              className="object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-2">
        {data.type === "BLANK" ? (
          <div className="col-span-2">
            <div className="inline-flex py-1 px-2 rounded-sm bg-gray-100 gap-2">
              <div className="size-5 flex items-center justify-center border rounded-full bg-green-500 text-white">
                <Check size={14} />
              </div>
              <span className=" text-sm">{data.options[0].text}</span>
            </div>
          </div>
        ) : (
          <>
            {data.options?.map((option) => (
              <div className="flex items-start gap-2" key={option._id}>
                <div
                  className={cn(
                    "size-5 flex items-center justify-center border rounded-full",
                    checkCompiled(option.value) && "bg-green-500 text-white"
                  )}
                >
                  {checkCompiled(option.value) && <Check size={14} />}
                </div>

                <div className="flex-1 w-full text-sm text-ellipsis">
                  {option.text}
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizItem;
