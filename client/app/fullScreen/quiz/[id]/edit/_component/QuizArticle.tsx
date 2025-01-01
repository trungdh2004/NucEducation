import SheetGemini from "@/components/common/SheetGemini";
import { Button } from "@/components/ui/button";
import { IQuestionAi } from "@/types/question.type";
import {
  ChevronRightIcon,
  FileSpreadsheetIcon,
  FolderDownIcon,
  SparklesIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  handleCreateMany: (value: IQuestionAi[]) => void;
}

const QuizArticle = ({ handleCreateMany }: IProps) => {
  const [openAi, setOpenAi] = useState(false);

  const handleClose = () => {
    setOpenAi(false);
  };

  return (
    <article className=" pt-4 relative top-0 md:pt-0 col-span-3 col-start-1  order-1 overflow-y-auto md:sticky md:top-20">
      <div className="flex flex-col gap-2">
        <div className="w-full border bg-white rounded-md p-2 box-shadow ">
          <div className="flex items-center gap-2">
            <Image
              src={"/logo-gemini.svg"}
              alt="gemini logo"
              width={30}
              height={30}
              className=" object-cover"
            />

            <h4 className="text-lg font-semibold text-blue-500">Gemini Ai</h4>
          </div>
          <p className="text-gray-500 mt-2 text-sm">
            Tạo các câu hỏi chuyên ngành cùng với AI Gemini của google
          </p>
        </div>
        <Button
          variant={"outline"}
          onClick={() => {
            setOpenAi(true);
          }}
        >
          <SparklesIcon size={20} /> Tạo câu hỏi với Gemini
        </Button>
        <div className="w-full border bg-white rounded-md box-shadow mt-2">
          <div className="flex items-center p-2 font-semibold">Nhập từ</div>
          <div className="flex items-center p-2 justify-between hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2 text-sm">
              <FileSpreadsheetIcon size={20} className="text-green-500" />
              Nhập từ Excel
            </div>

            <ChevronRightIcon size={20} />
          </div>
          <div className="flex items-center p-2 justify-between hover:bg-gray-100 cursor-pointer">
            <div className="flex items-center gap-2 text-sm">
              <FolderDownIcon size={20} className="text-green-500" />
              Tải bản mẫu
            </div>

            <ChevronRightIcon size={20} />
          </div>
        </div>

        <SheetGemini
          open={openAi}
          handleClose={handleClose}
          handleCreate={handleCreateMany}
        />
      </div>
    </article>
  );
};

export default QuizArticle;
