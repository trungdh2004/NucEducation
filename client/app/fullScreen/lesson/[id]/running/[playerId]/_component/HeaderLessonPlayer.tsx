import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LessonResponseReview } from "@/types/lesson.type";
import { LogOutIcon, Maximize, Minimize } from "lucide-react";
import { useState } from "react";
import { FaRunning } from "react-icons/fa";
import { GiFinishLine } from "react-icons/gi";

interface IProps {
  lesson: LessonResponseReview;
  totalQuestion: number;
  questionIndex: number;
  handleFinishPlayer: () => void;
}
const HeaderLessonPlayer = ({
  lesson,
  totalQuestion,
  questionIndex,
  handleFinishPlayer,
}: IProps) => {
  const [fullScreen, setFullscreen] = useState(false);
  const handleFullscreen = () => {
    if (fullScreen) {
      document.exitFullscreen();
      setFullscreen(false);
    } else {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
        setFullscreen(true);
        // Toàn màn hình toàn bộ tài liệu
      } else {
        alert("Trình duyệt của bạn không hỗ trợ Fullscreen API!");
      }
    }
  };

  return (
    <div className="h-16 w-full fixed top-0 left-0 flex items-center justify-between px-4 bg-[#19191980] z-10">
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <div className="size-10 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer">
              <LogOutIcon />
            </div>
          </DialogTrigger>
          <DialogContent className="bg-black border-none p-6">
            <div className="w-full bg-gray-600/50 rounded-md  flex flex-col p-2">
              <div className="w-full">
                <div className="relative w-full h-2">
                  <FaRunning
                    className="text-white absolute  -translate-x-1/2"
                    size={20}
                    style={{
                      left: `${(questionIndex / totalQuestion) * 100}%`,
                    }}
                  />
                  <GiFinishLine
                    className="absolute text-white right-0"
                    size={20}
                  />
                </div>

                <div className="w-full h-2 bg-white rounded-full mt-3">
                  <div
                    className=" bg-green-500 h-full rounded-l-full"
                    style={{
                      width: `${(questionIndex / totalQuestion) * 100}%`,
                    }}
                  ></div>
                </div>
                <div className="flex items-center x text-white text-xs justify-between mt-1">
                  <span>Bắt đầu</span>
                  <span>Kết thúc</span>
                </div>
              </div>

              <div className="pt-4 pb-2 text-center">
                <h3 className="text-white font-bold text-xl">
                  {totalQuestion - (questionIndex + 1)} câu còn lại
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <DialogClose asChild>
                  <Button variant={"success"}>Tiếp tục</Button>
                </DialogClose>
                <Button variant={"warning"} onClick={handleFinishPlayer}>
                  Lưu và thoát
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-2">
        <div className="h-10 text-white flex items-center gap-2 bg-white/10 rounded-sm px-2 ">
          <CodeComponent code={lesson.code} />
        </div>
        {/* <div className="size-10 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer">
          <Settings />
        </div> */}
        <div>
          <div
            className="size-10 rounded-sm bg-white/10 flex items-center justify-center text-white hover:bg-white/20 cursor-pointer"
            onClick={handleFullscreen}
          >
            {!fullScreen ? <Maximize /> : <Minimize />}
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
