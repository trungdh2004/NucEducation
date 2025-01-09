import { Badge } from "@/components/ui/badge";
import { getDifficulty } from "@/config/appQuestion";
import { IQuizResponse } from "@/types/quizz.type";
import { format } from "date-fns";
import { CircleHelpIcon, CirclePlayIcon, PlayIcon } from "lucide-react";
import Link from "next/link";

interface IProps {
  quiz: IQuizResponse;
}

const LessonItem = ({ quiz }: IProps) => {
  return (
    <div className="w-full border shadow-sm overflow-hidden rounded-xl min-h-20 bg-gradient-to-tr from-gray-200 to-gray-50 flex-shrink-0 cursor-grabbing hover:shadow-md">
      <div className="w-full h-full">
        <div
          className="h-40 relative  bg-cover"
          style={{
            backgroundImage: `url(${quiz.image})`,
          }}
        >
          <div className="w-full p-4 text-white">
            <p className="text-sm leading-4">{quiz.category.name}</p>
            <h2 className="text-xl font-bold leading-8 line-clamp-2">
              {quiz.name}
            </h2>
          </div>
        </div>
        <div className="h-20 relative bg-white">
          <Link href={`/diversity/view/${quiz._id}`}>
            <div className="absolute -top-8 right-2 size-16 border-4 rounded-full bg-white flex items-center justify-center cursor-pointer hover:bg-green-100 hover:border-green-500 hover:text-green-500">
              <PlayIcon size={20} />
            </div>
          </Link>

          <div className="w-full h-full p-2 flex flex-col justify-between">
            <div className="leading-5 text-sm flex items-center gap-1">
              <strong>Số câu hỏi:</strong>{" "}
              <span>{quiz.stats.totalQuestions}</span>{" "}
              <CircleHelpIcon size={14} />
            </div>
            <div className="leading-5 text-sm flex items-center gap-1">
              <strong>Lượt chơi:</strong> <span>{quiz.stats.totalPlayers}</span>{" "}
              <CirclePlayIcon size={14} />
            </div>
            <div className="w-full flex items-center justify-between">
              <div className="text-xs font-normal text-gray-400">
                Thời gian tạo: {format(quiz.createdAt, "dd/MM/yyyy")}
              </div>

              <Badge variant="outline" className="">
                {getDifficulty(quiz.difficulty)?.name}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonItem;
