import { CircleHelpIcon, CirclePlayIcon, PlayIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/components/ui/badge";

const LessonItem = () => {
  return (
    <div className="w-full border shadow-sm overflow-hidden rounded-xl min-h-20 bg-gradient-to-tr from-gray-200 to-gray-50 flex-shrink-0 cursor-grabbing hover:shadow-md">
      <div className="w-full h-full">
        <div className="h-40 relative bg-[url('/banner-lesson.png')] bg-cover">
          <div className="w-full p-4 text-white">
            <p className="text-sm leading-4">Toán học</p>
            <h2 className="text-xl font-bold leading-8 line-clamp-2">
              Ôn thi học kì 1 triết học đai học văn hóa vsd bfdb cacs
            </h2>
          </div>
        </div>
        <div className="h-20 relative bg-white">
          <div className="absolute -top-8 right-2 size-16 border-4 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-gray-50">
            <PlayIcon size={20} />
          </div>

          <div className="w-full h-full p-2 flex flex-col justify-between">
            <div className="leading-5 text-sm flex items-center gap-1">
              <strong>Số câu hỏi:</strong> <span>13</span>{" "}
              <CircleHelpIcon size={14} />
            </div>
            <div className="leading-5 text-sm flex items-center gap-1">
              <strong>Lượt chơi:</strong> <span>13</span>{" "}
              <CirclePlayIcon size={14} />
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-xs font-normal text-gray-400">
                Thời gian tạo: 13-12-2024
              </div>

              <Badge
                variant="outline"
                className="border-rose-500 text-rose-500"
              >
                Khó
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonItem;
