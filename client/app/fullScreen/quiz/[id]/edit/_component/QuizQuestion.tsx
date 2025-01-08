import {
  CheckIcon,
  Circle,
  CircleCheck,
  CircleCheckIcon,
  CircleXIcon,
  CopyIcon,
  EllipsisVertical,
  PencilIcon,
  RectangleHorizontalIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TooltipComponent from "@/components/common/TooltipComponent";
import {
  IOption,
  IQuestionResponse,
  TypeQuestion,
} from "@/types/question.type";
import { timeQuestion } from "@/config/appQuestion";
import Link from "next/link";

interface IProps {
  quizId?: string;
  data: IQuestionResponse;
  handleDeleteQuestion: (id: string) => void;
  handleCopy: (id: string) => void;
}

const QuizQuestion = ({
  quizId,
  data,
  handleDeleteQuestion,
  handleCopy,
}: IProps) => {
  return (
    <div className="w-full rounded-sm p-2 bg-white mt-4 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <TooltipComponent
            label={data.aiGenerated ? "Được Gemini tạo" : "Tự tạo"}
          >
            {data.aiGenerated ? (
              <div className="border rounded-sm p-1">
                <SparklesIcon size={12} />
              </div>
            ) : (
              <div className="border rounded-sm p-1">
                <Circle size={12} />
              </div>
            )}
          </TooltipComponent>
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
          <div className="border rounded-sm p-1 text-xs hidden sm:block">
            {timeQuestion.find((time) => time.value === data.time)?.name}
          </div>
        </div>
        <div className=" items-center gap-1 hidden sm:flex">
          <TooltipComponent label="Tạo bản sao">
            <div
              className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-gray-50 "
              onClick={() => {
                handleCopy(data._id);
              }}
            >
              <CopyIcon size={14} />
            </div>
          </TooltipComponent>
          <TooltipComponent label="Chỉnh sửa">
            <Link
              href={`/fullScreen/quiz/${quizId}/question/${data._id}/edit`}
              className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500"
            >
              <PencilIcon size={14} />
              <span className="text-xs">Chỉnh sửa</span>
            </Link>
          </TooltipComponent>
          <TooltipComponent label="Xóa">
            <div
              className="border rounded-sm p-1 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-500 cursor-pointer"
              onClick={() => {
                handleDeleteQuestion(data._id);
              }}
            >
              <Trash2Icon size={16} />
            </div>
          </TooltipComponent>
        </div>

        <div className="block sm:hidden">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <div className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-gray-50 ">
                <EllipsisVertical size={14} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" align="end">
              <DropdownMenuItem
                onClick={() => {
                  handleCopy(data._id);
                }}
              >
                <CopyIcon size={14} />
                Tạo bản sao
              </DropdownMenuItem>
              <Link
                href={`/fullScreen/quiz/${quizId}/question/${data._id}/edit`}
              >
                <DropdownMenuItem>
                  <PencilIcon size={14} />
                  Chỉnh sửa
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => {
                  handleDeleteQuestion(data._id);
                }}
              >
                <Trash2Icon size={16} />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs sm:text-sm text-wrap">
          <strong>Câu hỏi:</strong> {data.query.text}
        </p>

        {data.query.image && (
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

      <QuestionOption
        options={data.options}
        answers={data.answer}
        type={data.type}
      />
    </div>
  );
};

export default QuizQuestion;

interface IQuestionOption {
  type: TypeQuestion;
  options: IOption[];
  answers: number[];
}

export function QuestionOption({ type, options, answers }: IQuestionOption) {
  return (
    <>
      {type === "BLANK" ? (
        <div className="mt-2">
          <div className="flex items-center px-2 pb-2">
            <h4 className="text-xs text-slate-400">Câu trả lời</h4>
            <p className="flex-1 w-full h-[1px] bg-gray-100 ml-2"></p>
          </div>
          <div>
            <span className="px-2 py-1 bg-gray-50 rounded-sm text-xs sm:text-sm inline-flex items-center">
              <CircleCheck size={16} className="mr-1 text-green-500" />{" "}
              {options[0].text}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          <div className="flex items-center px-2 pb-2">
            <h4 className="text-xs text-slate-400">Lựa chọn trả lời</h4>
            <p className="flex-1 w-full h-[1px] bg-gray-100 ml-2"></p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {options.map((option) => (
              <div className="w-full flex items-start gap-2" key={option._id}>
                {answers.includes(option.value) ? (
                  <CircleCheckIcon size={20} className="text-green-500" />
                ) : (
                  <CircleXIcon size={20} className="text-rose-500" />
                )}

                <div className="flex-1 w-full text-sm text-ellipsis">
                  {option.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
