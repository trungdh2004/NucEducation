"use client";
import { pagingLessonApi } from "@/actions/lesson.action";
import CircularProgressbarPage from "@/components/common/CircularProgressbar";
import Paginations from "@/components/common/Pagination";
import { cn } from "@/lib/utils";
import { IPagingLesson, LessonResponseReview } from "@/types/lesson.type";
import { ChangeSearch, Response } from "@/types/system.type";
import { format } from "date-fns";
import { ListCheck, UsersRoundIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderReport from "./HeaderReport";

const TableReports = () => {
  const router = useRouter();
  const [searchObject, setSearchObject] = useState<IPagingLesson>({
    pageIndex: 1,
    pageSize: 5,
    typeRunning: 0,
    date: undefined,
  });
  const [response, setResponse] = useState<Response<LessonResponseReview>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const handlePaging = async (obj: IPagingLesson) => {
    try {
      const data = await pagingLessonApi(obj);
      setResponse(data);
    } catch (error: unknown) {
      console.log("err", error);
    }
  };

  const handleChangeSearchObject = async (obj: ChangeSearch) => {
    const valueOld = searchObject;

    const searchNew = {
      ...valueOld,
      ...obj,
    };
    setSearchObject(searchNew);
    handlePaging(searchNew);
  };

  useEffect(() => {
    handlePaging({
      pageIndex: 1,
      pageSize: 5,
      typeRunning: 0,
    });
  }, []);

  const handleCorrect = (totalCorrect: number, totalAnswer: number): number => {
    if (totalCorrect === 0) return 0;
    if (totalAnswer === 0) return 0;

    return Math.floor((totalCorrect * 100) / totalAnswer);
  };

  return (
    <>
      <HeaderReport
        handleChangeSearchObject={handleChangeSearchObject}
        searchObject={searchObject}
      />
      <div className="mt-4 w-full">
        <div className="rounded-md overflow-hidden bg-white box-shadow mt-4 w-full">
          <table className="table-fixed w-full border rounded-md hidden sm:block">
            <thead className="w-full">
              <tr className="bg-gray-50 text-gray-500">
                <td className="partition-border font-bold text-xs text-dark-4 px-3 py-2 w-2/12 max-w-2/12">
                  <div className="flex items-center justify-start gap-3">
                    <span>STT</span>
                    <span>Loại</span>
                  </div>
                </td>
                <td className="partition-border font-bold text-xs text-dark-4 px-3 py-2 w-3/12">
                  Tên Quiz
                </td>
                <td className="partition-border font-bold text-xs text-dark-4 px-3 py-2 w-1/12 text-center">
                  Tổng người tham gia
                </td>

                <td className="partition-border font-bold text-xs text-dark-4 px-3 py-2 w-1/12 text-center">
                  Câu đúng
                </td>
                <td className="partition-border font-bold text-xs text-dark-4 px-3 py-2 w-2/12 text-center">
                  Mã số
                </td>
              </tr>
            </thead>
            <tbody>
              {response?.content?.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center h-14">
                    Không có giá trị
                  </td>
                </tr>
              )}

              {response?.content?.map((lesson, index) => (
                <tr
                  className="partition-border cursor-pointer h-16 hover:bg-gray-100"
                  key={lesson._id}
                  onClick={() => {
                    router.push(`/reports/${lesson._id}`);
                  }}
                >
                  <td className="">
                    <div className="flex items-center gap-3 px-3">
                      <span className=" border rounded-sm text-xs size-5 flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="w-full">
                        <div
                          className={cn(
                            "game-type-label flex items-center border-l-[3px] rounded max-h-min text-[10px] max-w-[100px] px-2 py-1 overflow-ellipsis whitespace-nowrap async bg-green-200 border-green-500 text-green-500",
                            lesson.type === "live" &&
                              "bg-violet-200 border-violet-500 text-violet-500"
                          )}
                        >
                          <ListCheck size={14} />
                          <span className="text-xs leading-3">
                            {lesson.type === "live" ? "Trực tiếp" : "Luôn luôn"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="w-4/12">
                    <div className="flex flex-col ml-3 py-2">
                      <div className="flex flex-row">
                        <span className="text-sm text-black font-semibold text-ellipsis ">
                          {lesson.name}
                        </span>
                      </div>
                      <div className="flex">
                        <span className="text-xs text-gray-500">
                          {format(lesson.startAt, "dd-MM-yyyy")}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center text-xs text-black font-semibold px-3">
                      <span>{lesson.totalPlayers}</span>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center text-xs text-black font-semibold px-3">
                      <div className="size-8 text-sm">
                        <CircularProgressbarPage
                          value={handleCorrect(
                            lesson.totalCorrect,
                            lesson.totalAnswers
                          )}
                        />
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="flex items-center justify-center">
                      {lesson.code && (
                        <span
                          className="px-2 py-1 rounded-sm text-xs border"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(lesson.code);
                              toast.success(
                                "Đã lưu mã code vào clipboard của bạn"
                              );
                            }
                          }}
                        >
                          {lesson.code}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex flex-col gap-2 sm:hidden">
            {response?.content?.map((lesson) => (
              <div
                className="w-full p-4 rounded-md bg-white box-shadow border flex flex-col gap-2"
                key={lesson._id}
                onDoubleClick={() => {
                  router.push(`/reports/${lesson._id}`);
                }}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "flex items-center border-l-[3px] rounded max-h-min text-[10px] max-w-[100px] px-2 py-1 overflow-ellipsis whitespace-nowrap async bg-green-200 border-green-500 text-green-500",
                        lesson.type === "live" &&
                          "bg-violet-200 border-violet-500 text-violet-500"
                      )}
                    >
                      <ListCheck size={14} />
                      <span className="text-xs leading-3">
                        {lesson.type === "live" ? "Trực tiếp" : "Luôn luôn"}
                      </span>
                    </div>

                    <div className="p-1 rounded bg-rose-200 text-rose-500 text-xs font-semibold">
                      {handleCorrect(lesson.totalCorrect, lesson.totalAnswers)}%
                    </div>
                  </div>
                </div>

                <div className="text-ellipsis overflow-hidden whitespace-nowrap max-w-60">
                  <span className="text-sm font-semibold ">{lesson.name}</span>
                </div>

                <div className="text-xs text-gray-400">
                  {format(lesson.startAt, "dd/MM/yyyy")}
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    <UsersRoundIcon size={14} />
                    <span>{lesson.totalPlayers} lượt chơi</span>
                  </div>
                  {lesson?.class?.length > 0 && (
                    <div className="flex items-center gap-1 border-l-2 pl-2">
                      <span>{lesson?.class?.length} lớp học</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {response?.totalPages > 0 && (
          <div className="mt-2 flex justify-center">
            <Paginations
              pageCount={1}
              handlePageClick={(value) => {
                handleChangeSearchObject({
                  pageIndex: value.selected + 1,
                });
              }}
              forcePage={0}
              size={"sm"}
              className="bg-white px-2 py-1 rounded-sm"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default TableReports;
