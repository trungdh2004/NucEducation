import { Button } from "@/components/ui/button";
import { IQuizResponse, IUpdateQuiz } from "@/types/quizz.type";
import { ChevronLeftIcon, FileSymlinkIcon, SettingsIcon } from "lucide-react";
import React, { useState } from "react";
import QuizModel from "./QuizModel";
import Link from "next/link";

interface Props {
  quiz: IQuizResponse;
  handleEditQuiz: (data: IUpdateQuiz) => void;
}

const HeaderQuiz = ({ quiz, handleEditQuiz }: Props) => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <div className="fixed top-0 left-0 ring-0 h-14 border-b bg-white w-full flex items-center justify-between px-2 sm:px-4 z-20">
      <div className="flex items-center gap-4">
        <Link href={`/quiz/${quiz._id}`}>
          <Button variant={"outline"} size={"sm"}>
            <ChevronLeftIcon />
          </Button>
        </Link>

        <div className="max-w-60 truncate cursor-pointer text-nowrap text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md px-2 py-2 hidden md:block">
          {quiz?.name}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            setOpenModel(true);
          }}
        >
          <SettingsIcon size={20} /> Cài đặt
        </Button>
        <Button size={"sm"}>
          <FileSymlinkIcon size={20} /> Xuất bản
        </Button>
      </div>

      <QuizModel
        open={openModel}
        handleClose={() => {
          setOpenModel(false);
        }}
        initData={quiz}
        handleEditQuiz={handleEditQuiz}
      />
    </div>
  );
};

export default HeaderQuiz;
