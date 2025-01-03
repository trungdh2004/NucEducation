import Logo from "@/components/root/header/Logo";
import { LessonResponseReview } from "@/types/lesson.type";
import { Maximize, Settings } from "lucide-react";
import React from "react";
import Countdown from "react-countdown";

interface IProps {
  lesson: LessonResponseReview;
}
const HeaderLessonPlayer = ({ lesson }: IProps) => {
  return (
    <div className="h-16 w-full fixed top-0 left-0 flex items-center justify-between px-4 bg-[#19191980] z-10">
      <div className="flex items-center gap-2">
        <div>
          <Logo className="size-10" />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-10 text-white flex items-center gap-2 bg-white/10 rounded-sm px-2 ">
          <CodeComponent code={lesson.code} />
        </div>
        <div className="size-10 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer">
          <Settings />
        </div>
        <div>
          <div className="size-10 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer">
            <Maximize />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderLessonPlayer;

function CodeComponent({ code }: { code: string }) {
  const part1 = code?.substring(0, 4); // Lấy từ vị trí 0 đến 4
  const part2 = code?.substring(4, 8);
  return (
    <>
      <span>{part1}</span>
      <span>{part2}</span>
    </>
  );
}
