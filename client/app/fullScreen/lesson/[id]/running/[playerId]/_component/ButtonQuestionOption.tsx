import { cn } from "@/lib/utils";
import { TypeQuestion } from "@/types/question.type";
import { Check } from "lucide-react";
import React from "react";
interface IProps {
  value: number;
  text: string;
  type: TypeQuestion;
  selected: boolean;
  handleAnswer: (type: TypeQuestion, value: number | string) => void;
  isSuccess?: boolean;
  isPending: boolean;
  status: "none" | "completed" | "wrong";
}

const ButtonQuestionOption = ({
  value,
  text,
  type,
  selected,
  handleAnswer,
  isSuccess,
  isPending,
  status,
}: IProps) => {
  return (
    <button
      className={cn(
        "h-full w-full sm:w-[calc(100%/var(--totalOptions))] rounded-lg bg-gradient-to-b from-[#3434c9] to-[#1a1a63]   border-b-4 hover:border-b-0 cursor-pointer border-[#0e0e38] p-2 group hover:bg-[#1a1a63]/80 disabled:opacity-80",
        selected && "bg-[#1a1a63]/80 bg-none",
        status !== "none" &&
          Boolean(isSuccess) === true &&
          "bg-none bg-green-500 hover:bg-green-600",
        status !== "none" && isSuccess === false && "opacity-0 "
      )}
      onClick={() => {
        handleAnswer(type, value);
      }}
      disabled={isPending}
    >
      <div className="relative w-full h-full rounded-md">
        <div
          className={cn(
            "absolute w-full top-1 flex justify-center opacity-100 items-center transition-opacity duration-200 group-hover:opacity-0",
            selected && "hidden"
          )}
        >
          <div className="w-4/5 h-[1px] bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>
        </div>

        <div className="w-full h-full">
          <div className="flex items-center justify-center h-full w-full text-center text-white text-xl font-semibold">
            <p>{text}</p>
          </div>
        </div>

        {type === "MTQ" && (
          <div
            className={cn(
              "absolute top-1 right-0 size-8 rounded-md border-black/70 border flex items-center justify-center hover:bg-black/20",
              selected && "bg-black/20"
            )}
          >
            {selected && <Check className="text-white" size={20} />}
          </div>
        )}
      </div>
    </button>
  );
};

export default ButtonQuestionOption;
