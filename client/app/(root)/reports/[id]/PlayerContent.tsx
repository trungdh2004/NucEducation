import { detailsPlayerApi } from "@/actions/player.action";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { IPlayerDetails, PlayerResponse } from "@/types/player.type";
import { format } from "date-fns";
import { Check, CircleCheckIcon, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface IProps {
  players: PlayerResponse[];
  totalQuestion: number;
}
const PlayerContent = ({ players, totalQuestion }: IProps) => {
  const [open, setOpen] = useState<string | null>("");
  const [data, setData] = useState<IPlayerDetails | null>(null);

  const handlePercent = (value: number, totalValue: number) => {
    return Math.floor((value * 100) / totalValue);
  };

  const handleDetailsValue = async (id: string) => {
    try {
      const data = await detailsPlayerApi(id);
      setData(data);
      setOpen(id);
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("Chi tiết thất bại");
    }
  };

  const handleClose = () => {
    setOpen(null);
    setData(null);
  };

  return (
    <>
      <div className="w-full p-2 flex items-center justify-end gap-3 bg-white rounded-md border">
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-sm bg-green-500"></div>
          <span className="text-sm text-gray-500 leading-4">Câu đúng</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-sm bg-rose-500"></div>
          <span className="text-sm text-gray-500 leading-4">Sai</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="size-4 rounded-sm bg-gray-500"></div>
          <span className="text-sm text-gray-500 leading-4">Chưa làm</span>
        </div>
      </div>

      {players?.length > 0 &&
        players.map((player) => (
          <div
            className="mt-2 p-2 border rounded-md bg-white hover:bg-gray-50 cursor-pointer"
            key={player._id}
            onClick={() => {
              handleDetailsValue(player._id);
            }}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className=" text-base">{player.name}</div>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col px-1 sm:px-2 items-center">
                    <p className="text-sm sm:text-base font-semibold">
                      {handlePercent(player.totalCorrect, totalQuestion)}%
                    </p>
                    <span className="text-xs font-medium">Tỉ lệ đúng</span>
                  </div>
                  <div className="flex flex-col px-1 sm:px-2 items-center">
                    <p className="text-sm sm:text-base font-semibold">
                      {player.totalCorrect}/{totalQuestion}
                    </p>
                    <span className="text-xs font-medium">Câu đúng</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full gap-1">
                <AnswerPlayer
                  totalAnswers={player.totalQuestionAnswer}
                  totalCorrect={player.totalCorrect}
                  totalWrong={player.totalWrong}
                  totalQuestion={totalQuestion}
                />
              </div>
              <div className="flex items-center justify-center gap-2">
                <div className="px-2 h-5 rounded-sm text-rose-500 border border-rose-500 bg-rose-100 text-sm flex items-center ">
                  <X size={14} /> {player.totalWrong}
                </div>
                <div className="px-2 h-5 rounded-sm text-green-500 border border-green-500 bg-green-100 text-sm flex items-center ">
                  <Check size={14} />
                  {player.totalCorrect}
                </div>
              </div>
            </div>
          </div>
        ))}

      <Dialog open={!!open} onOpenChange={handleClose}>
        <DialogContent className="p-4 max-w-2xl overflow-y-auto max-h-[calc(100vh-100px)]">
          {data?.player && (
            <DialogHeader className=" border-b pb-2">
              <DialogTitle className="flex items-center justify-center flex-col">
                <p className="text-lg font-semibold ">{data.player.name}</p>
                <p className="text-sm text-gray-500 font-light">
                  {format(data.player.startPlay, "HH:mm dd/MM/yyyy")}
                </p>
              </DialogTitle>
            </DialogHeader>
          )}

          <div className="py-2 ">
            <div className="">
              <div className="flex items-center gap-1">
                <AnswerPlayer
                  totalAnswers={data?.player.totalQuestionAnswer || 0}
                  totalCorrect={data?.player.totalCorrect || 0}
                  totalWrong={data?.player.totalWrong || 0}
                  totalQuestion={totalQuestion}
                />
              </div>

              <div className="flex items-center justify-center mt-1 gap-1">
                <div className="px-2 h-5 rounded-sm text-rose-500 border border-rose-500 bg-rose-100 text-sm flex items-center ">
                  <X size={14} />
                  {data?.player.totalWrong || 0}
                </div>
                <div className="px-2 h-5 rounded-sm text-green-500 border border-green-500 bg-green-100 text-sm flex items-center ">
                  <Check size={14} />
                  {data?.player.totalCorrect || 0}
                </div>
              </div>
            </div>

            {data?.response?.map((item) => (
              <div
                className="mt-4 border rounded-sm p-3"
                key={item.question._id}
              >
                <div className="flex pb-2 items-center gap-2">
                  {item.isCorrect ? (
                    <div className="px-2 py-1 text-xs text-green-500 bg-green-100 rounded-sm flex items-center gap-1">
                      <Check size={14} />
                      <span>Câu đúng</span>
                    </div>
                  ) : (
                    <div className="px-2 py-1 text-xs text-rose-500 bg-rose-100 rounded-sm flex items-center gap-1">
                      <X size={14} />
                      <span>Câu sai</span>
                    </div>
                  )}

                  <div className="bg-gray-100 rounded-sm flex items-center text-xs px-2 py-1 gap-1">
                    <CircleCheckIcon size={14} />
                    <span>
                      {item.question.type === "BLANK"
                        ? "Điền vào ô trống"
                        : "Nhiều câu trả lời"}
                    </span>
                  </div>
                </div>

                <div className="py-2 flex items-center gap-2">
                  {item.query.image && (
                    <div className="size-20 rounded-md border">
                      <Image
                        src={item.query.image}
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-start">
                    <p className="text-sm">{item.query.text}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-1/2">
                    <p className="text-xs text-gray-400">Trả lời</p>
                    <div className="flex items-center gap-1 flex-wrap">
                      {item.response.map((text, index) => (
                        <p
                          className="text-sm px-1 py-[0.5] bg-gray-100 rounded-sm"
                          key={index}
                        >
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="w-1/2">
                    <p className="text-xs text-green-400 font-semibold">
                      Đáp án đúng
                    </p>
                    <div className="flex items-center gap-1 flex-wrap">
                      {item.answer.map((answer, index) => (
                        <p
                          className="text-sm px-1 py-[0.5] bg-gray-100 rounded-sm"
                          key={index}
                        >
                          {answer.text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PlayerContent;

function AnswerPlayer({
  totalCorrect,
  totalWrong,
  totalQuestion,
  totalAnswers,
}: {
  totalCorrect: number;
  totalWrong: number;
  totalQuestion: number;
  totalAnswers: number;
}) {
  const arrCorrect = Array.from(
    { length: totalCorrect },
    (item, index) => index
  );
  const arrWrong = Array.from({ length: totalWrong }, (item, index) => index);
  const arrNot = Array.from(
    { length: totalQuestion - totalAnswers },
    (item, index) => index
  );
  return (
    <>
      {arrCorrect.map((item) => (
        <span className="w-full h-4 bg-green-500" key={item}></span>
      ))}
      {arrWrong.map((item) => (
        <span className="w-full h-4 bg-rose-500" key={item}></span>
      ))}
      {arrNot.map((item) => (
        <span className="w-full h-4 bg-gray-500" key={item}></span>
      ))}
    </>
  );
}
