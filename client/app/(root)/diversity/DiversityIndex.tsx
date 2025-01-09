import { getAllCateApi } from "@/actions/category.action";
import { lessonLiveApi } from "@/actions/lesson.action";
import { getByIdQuizApi, pagingQuizDiApi } from "@/actions/quiz.action";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appDifficultyQuiz, getDifficulty } from "@/config/appQuestion";
import rankConfig, { getRank } from "@/config/rank.config";
import { cn } from "@/lib/utils";
import { CateResponse } from "@/types/Category.type";
import { IQuestionResponse } from "@/types/question.type";
import { IQuizResponse } from "@/types/quizz.type";
import {
  ChangeSearchQuizDiPaging,
  Response,
  SearchQuizDiPaging,
} from "@/types/system.type";
import {
  Check,
  CheckIcon,
  LoaderIcon,
  PlayIcon,
  RectangleHorizontalIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { toast } from "sonner";

interface ISelect {
  quiz: IQuizResponse | null;
  questions: IQuestionResponse[];
}

const DiversityIndex = () => {
  const [isPending, setTransition] = useTransition();
  const router = useRouter();
  const [isPendingStart, setTransitionStart] = useTransition();
  const [response, setResponse] = useState<Response<IQuizResponse>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [searchObject, setSearchObject] = useState<SearchQuizDiPaging>({
    pageIndex: 1,
    pageSize: 10,
    sort: -1,
    category: "",
    difficulty: undefined,
    level: undefined,
    keyword: "",
    isPublic: true,
    deleted: false,
  });
  const [selected, setSelected] = useState<ISelect>({
    quiz: null,
    questions: [],
  });
  const [listCategory, setListCategory] = useState<CateResponse[]>([]);

  const handlePaging = async (pageIndex: number, obj?: object) => {
    try {
      const data = await pagingQuizDiApi({
        ...searchObject,
        ...obj,
        pageIndex,
      });
      setResponse((prevData) => ({
        ...data,
        content:
          pageIndex === 1
            ? data.content
            : [...prevData.content, ...data.content],
      }));
    } catch (error: unknown) {
      console.log("err", error);
      toast.error("Call Api lỗi");
    }
  };

  const handleSelect = async (id: string) => {
    setTransition(async () => {
      try {
        const data = await getByIdQuizApi(id);
        setSelected(data);
      } catch (error: unknown) {
        console.log("err", error);
        toast.error("Call Api lỗi");
      }
    });
  };

  const handleNextPage = () => {
    handlePaging(searchObject.pageIndex + 1);
    setSearchObject((prev) => ({
      ...prev,
      pageIndex: prev.pageIndex + 1,
    }));
  };

  const handleChangeSearch = (value: ChangeSearchQuizDiPaging) => {
    const valueOld = searchObject;

    const searchNew = {
      ...valueOld,
      ...value,
    };
    setSearchObject(searchNew);
    handlePaging(1, searchNew);
  };

  useEffect(() => {
    handlePaging(1);
    (async () => {
      try {
        const data = await getAllCateApi();
        setListCategory(data);
      } catch (error: unknown) {
        console.log("error", error);
      }
    })();
  }, []);

  const handleCreateLiveLesson = async () => {
    setTransitionStart(async () => {
      if (!selected.quiz) return;
      try {
        const data = await lessonLiveApi({
          name: selected.quiz.name,
          type: "live",
          quizId: selected.quiz._id,
          quizName: selected.quiz.name,
        });

        router.push(`/fullScreen/activity/${data._id}`);
      } catch (error: unknown) {
        const err = error as Error;
        console.log("err lesson live", error);
        toast.error(err.message);
      }
    });
  };

  return (
    <div className="p-2 sm:p-4">
      <header className="flex w-full flex-col gap-2">
        <div className="flex items-center mt-2">
          <div className="flex items-center gap-2">
            <div className="">
              <Select
                onValueChange={(value) => {
                  handleChangeSearch({
                    difficulty: +value === 0 ? undefined : +value,
                  });
                }}
              >
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Độ khó" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`0`}>Tất cả</SelectItem>
                  {appDifficultyQuiz.map((difficulty) => (
                    <SelectItem
                      value={`${difficulty.value}`}
                      key={difficulty.value}
                    >
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select
                onValueChange={(value) => {
                  handleChangeSearch({
                    level: +value === 0 ? undefined : +value,
                  });
                }}
              >
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Lớp" className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`0`}>Tất cả</SelectItem>
                  {rankConfig.map((difficulty) => (
                    <SelectItem
                      value={`${difficulty.value}`}
                      key={difficulty.value}
                    >
                      {difficulty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select
                onValueChange={(value) => {
                  handleChangeSearch({
                    category: value === "0" ? undefined : value,
                  });
                }}
              >
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Môn học" className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={`0`}>Tất cả</SelectItem>
                  {listCategory.map((item) => (
                    <SelectItem value={`${item._id}`} key={item._id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 py-4">
        <div className="col-span-12 md:col-span-5  overflow-x-hidden">
          <div className="bg-white border rounded-md">
            <InfiniteScroll
              dataLength={response.content?.length} //This is important field to render the next data
              next={handleNextPage}
              hasMore={response.pageIndex < response.totalPages}
              loader={
                <p className="text-center text-sm text-gray-500">Loading...</p>
              }
              endMessage={<p></p>}
              // below props only if you need pull down functionality
              pullDownToRefresh
              refreshFunction={() => {}}
              pullDownToRefreshThreshold={10}
              pullDownToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8595; Pull down to refresh
                </h3>
              }
              releaseToRefreshContent={
                <h3 style={{ textAlign: "center" }}>
                  &#8593; Release to refresh
                </h3>
              }
            >
              {response?.content?.map((item) => (
                <div
                  className={cn(
                    "flex p-4 items-center justify-between border-b hover:bg-blue-200 cursor-pointer relative",
                    item._id === selected.quiz?._id && "bg-blue-200"
                  )}
                  key={item._id}
                >
                  <div
                    className="absolute inset-0 hidden md:block"
                    onClick={() => {
                      handleSelect(item._id);
                    }}
                  ></div>
                  <Link
                    href={`/diversity/view/${item._id}`}
                    className="absolute inset-0 md:hidden cursor-pointer"
                  ></Link>
                  <div className="">
                    <h1 className="cursor-pointer">{item.name}</h1>

                    <div className="flex items-center text-xs text-gray-500 gap-1">
                      <span>{getRank(item.level)?.name}</span>
                      <span>-</span>
                      <span>{item.stats.totalQuestions || 0} câu hỏi</span>
                      <span>-</span>
                      <span>{getDifficulty(item.difficulty)?.name}</span>
                    </div>
                  </div>
                  <div className="size-10">
                    <Image
                      src={item.image}
                      alt=""
                      width={40}
                      height={40}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                </div>
              ))}
              {response?.content?.length === 0 && (
                <div className="w-full h-20 flex items-center justify-center rounded-md bg-white text-gray-400 text-sm">
                  <span>Không có bài học nào</span>
                </div>
              )}
            </InfiniteScroll>
          </div>
        </div>
        <div className="hidden md:block md:col-span-7 ">
          <div className="max-h-[calc(100vh-100px)] h-full bg-white rounded-md border sticky top-20 overflow-y-auto">
            {isPending ? (
              <div className="animate-pulse w-full ">
                <div className="w-full h-10 bg-gray-100 mb-2"></div>
                <div className="p-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-20 h-5 rounded-sm bg-gray-100"></div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-20 rounded-sm bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center justify-between">
                      <div className="w-20 h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-20 h-5 rounded-sm bg-gray-100"></div>
                    </div>
                    <div className="mt-2">
                      <div className="w-full h-20 rounded-sm bg-gray-100"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                      <div className="w-full h-5 rounded-sm bg-gray-100"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {selected.quiz ? (
                  <div>
                    <div className="w-full h-16 border-b rounded-t-md flex items-center justify-between px-4 sticky top-0 bg-white">
                      <div>
                        <Link
                          href={`/diversity/view/${selected?.quiz?._id}`}
                          className=" cursor-pointer"
                        >
                          <h4>{selected?.quiz?.name}</h4>
                        </Link>

                        <div className="flex items-center text-xs text-gray-500 gap-1">
                          <span>{getRank(selected.quiz.level)?.name}</span>
                          <span>-</span>
                          <span>{selected.questions.length} câu hỏi</span>
                          <span>-</span>
                          <span>
                            {getDifficulty(selected.quiz.difficulty)?.name}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <Button
                          size={"sm"}
                          onClick={handleCreateLiveLesson}
                          disabled={isPendingStart}
                        >
                          {isPendingStart ? (
                            <LoaderIcon className="animate-spin" />
                          ) : (
                            <PlayIcon />
                          )}
                          Bắt đầu
                        </Button>
                      </div>
                    </div>

                    <div className="px-4">
                      {selected?.questions?.map((data) => (
                        <div className="border-t py-2" key={data._id}>
                          <div className="w-full">
                            <div className="flex items-center justify-between">
                              {data.type === "BLANK" ? (
                                <div className="border rounded-sm p-1 flex items-center gap-1">
                                  <RectangleHorizontalIcon size={16} />
                                  <span className="text-xs">
                                    Điền vào chỗ trống
                                  </span>
                                </div>
                              ) : (
                                <div className="border rounded-sm p-1 flex items-center gap-1">
                                  <CheckIcon size={16} />
                                  <span className="text-xs">
                                    Chọn đáp án đúng
                                  </span>
                                </div>
                              )}
                            </div>

                            <div className="mt-2">
                              <p className="text-sm text-wrap">
                                <strong>Câu hỏi:</strong> {data.query.text}
                              </p>

                              {data?.query?.image && (
                                <div className="size-20 mt-2">
                                  <Image
                                    src={data.query.image}
                                    alt="image quiz"
                                    width={100}
                                    height={100}
                                    className="object-cover rounded-md"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 mt-3 gap-2">
                              {data.type === "BLANK" ? (
                                <div className="col-span-2">
                                  <div className="inline-flex py-1 px-2 rounded-sm bg-gray-100 gap-2">
                                    <div className="size-5 flex items-center justify-center border rounded-full bg-green-500 text-white">
                                      <Check size={14} />
                                    </div>
                                    <span className=" text-sm">
                                      {data.options[0].text}
                                    </span>
                                  </div>
                                </div>
                              ) : (
                                <>
                                  {data.options?.map((option) => (
                                    <div
                                      className="flex items-start gap-2"
                                      key={option._id}
                                    >
                                      <div
                                        className={cn(
                                          "size-5 flex items-center justify-center border rounded-full"
                                        )}
                                      ></div>

                                      <div className="flex-1 w-full text-sm text-ellipsis">
                                        {option.text}
                                      </div>
                                    </div>
                                  ))}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <p className="text-lg text-gray-500">
                      Hãy chọn 1 bài học bên trái
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiversityIndex;
