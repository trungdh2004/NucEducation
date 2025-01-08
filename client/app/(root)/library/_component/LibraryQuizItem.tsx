import TooltipComponent from "@/components/common/TooltipComponent";
import { Badge } from "@/components/ui/badge";
import { getDifficulty } from "@/config/appQuestion";
import { getRank } from "@/config/rank.config";
import { IQuizResponse } from "@/types/quizz.type";
import { format } from "date-fns";
import {
  EarthIcon,
  GlobeLockIcon,
  GraduationCap,
  LibraryBigIcon,
  List,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  data: IQuizResponse;
}

const LibraryQuizItem = ({ data }: Props) => {
  return (
    <Link href={`/quiz/${data._id}`}>
      <div className="w-full bg-white rounded-md border box-shadow hover:bg-gray-50 cursor-pointer p-2 flex items-center">
        <div>
          <div className="h-28 w-28 md:w-28 md:h-28 relative rounded-sm overflow-hidden bg-light-2">
            <Image
              src={data.image}
              alt=""
              width={112}
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div className="w-full ml-2 flex-1 flex justify-between h-full">
          <div className=" flex-1 w-full h-full flex flex-col justify-between gap-2">
            <div className="flex items-center justify-between">
              <Badge variant="outline" className="py-0.5 text-[10px]">
                {getDifficulty(data.difficulty)?.name}
              </Badge>

              <TooltipComponent
                label={data.isPublic ? "Công khai" : "Chưa đăng tải"}
              >
                <div>
                  {data.isPublic ? (
                    <EarthIcon size={20} className="text-blue-500" />
                  ) : (
                    <GlobeLockIcon size={20} className="text-rose-500" />
                  )}
                </div>
              </TooltipComponent>
            </div>
            <div className="w-full">
              <h1 className="font-[600] w-full line-clamp-1">{data.name}</h1>
            </div>
            <div className="w-full flex items-center text-sm">
              <div className="flex items-center mr-3">
                <List className="w-[14px] h-[14px] mr-1" />
                <span className="text-xs leading-3">
                  {data.stats.totalQuestions || 0} câu hỏi
                </span>
              </div>
              <div className="flex items-center mr-3">
                <GraduationCap className="w-[14px] h-[14px] mr-1" />
                <span className="text-xs leading-3">
                  {getRank(data.level)?.name}
                </span>
              </div>
              <div className="flex items-center mr-3">
                <LibraryBigIcon className="w-[14px] h-[14px] mr-1" />
                <span className="text-xs leading-3">{data.category?.name}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden mr-3">
                  <Image
                    src={data.createBy.avatar}
                    alt="avatar"
                    width={20}
                    height={20}
                    className="object-cover sm:w-6 sm:h-6"
                  />
                </div>

                <div className="flex items-center text-xs text-slate-600 gap-1">
                  <span className="max-sm:text-[10px]">
                    {data.createBy.name}
                  </span>
                </div>
              </div>

              <div className="">
                <span className="text-xs text-gray-400">
                  {format(data.createdAt, "HH:mm dd/MM/yyyy")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default LibraryQuizItem;
