import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SelectGroup } from "@radix-ui/react-select";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import QuizItem from "../quiz/_component/QuizItem";
import { Check, CheckIcon, RectangleHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import InfiniteScroll from "react-infinite-scroll-component";
import { getByIdQuizApi, pagingQuizDiApi } from "@/actions/quiz.action";
import { Response } from "@/types/system.type";
import { IQuizResponse } from "@/types/quizz.type";
import { getRank } from "@/config/rank.config";
import { getDifficulty } from "@/config/appQuestion";
const DiversityIndex = () => {
  const [array, setArray] = useState(Array.from({ length: 10 }));
  const [response, setResponse] = useState<Response<IQuizResponse>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [selected, setSelected] = useState({});

  const handlePaging = async () => {
    try {
      const data = await pagingQuizDiApi({
        pageIndex: 1,
        pageSize: 10,
        sort: -1,
      });
      setResponse(data);
    } catch (error) {}
  };

  const handleSelect = async (id: string) => {
    try {
      const data = await getByIdQuizApi(id);
      setSelected(data);
    } catch (error) {}
  };

  useEffect(() => {
    handlePaging();
  }, []);

  const arr = [
    {
      query: {
        text: "xin chào bạn tôi là trung nè bạn là ai ??",
        image:
          "https://res.cloudinary.com/dundmo7q8/image/upload/v1735463058/nuceducation/bxjmj7xnd1opg5yyl5fi.jpg",
      },
      _id: "6771123ee71d56bde750118a",
      aiGenerated: false,
      quizId: "676ed1300d795c5d8f340570",
      time: 20000,
      type: "MTQ",
      answer: [0, 1, 2],
      deleted: false,
      options: [
        {
          text: "a",
          value: 0,
          _id: "6772592eda561e2de5c7c1d2",
        },
        {
          text: "b",
          value: 1,
          _id: "6772592eda561e2de5c7c1d3",
        },
        {
          text: "c",
          value: 2,
          _id: "6772592eda561e2de5c7c1d4",
        },
        {
          text: "d",
          value: 3,
          _id: "6772592eda561e2de5c7c1d5",
        },
      ],
      isPublic: false,
      createdAt: "2024-12-29T09:11:26.870Z",
      updatedAt: "2024-12-30T08:26:22.365Z",
      __v: 0,
    },
    {
      query: {
        text: "xin chào bạn tôi là trung nè bạn là ai ??",
        image:
          "https://res.cloudinary.com/dundmo7q8/image/upload/v1735463058/nuceducation/bxjmj7xnd1opg5yyl5fi.jpg",
      },
      _id: "6771123ee71d56bde750118a",
      aiGenerated: false,
      quizId: "676ed1300d795c5d8f340570",
      time: 20000,
      type: "MTQ",
      answer: [0, 1, 2],
      deleted: false,
      options: [
        {
          text: "a",
          value: 0,
          _id: "6772592eda561e2de5c7c1d2",
        },
        {
          text: "b",
          value: 1,
          _id: "6772592eda561e2de5c7c1d3",
        },
        {
          text: "c",
          value: 2,
          _id: "6772592eda561e2de5c7c1d4",
        },
        {
          text: "d",
          value: 3,
          _id: "6772592eda561e2de5c7c1d5",
        },
      ],
      isPublic: false,
      createdAt: "2024-12-29T09:11:26.870Z",
      updatedAt: "2024-12-30T08:26:22.365Z",
      __v: 0,
    },
    {
      query: {
        text: "xin chào bạn tôi là trung nè bạn là ai ??",
        image:
          "https://res.cloudinary.com/dundmo7q8/image/upload/v1735463058/nuceducation/bxjmj7xnd1opg5yyl5fi.jpg",
      },
      _id: "6771123ee71d56bde750118a",
      aiGenerated: false,
      quizId: "676ed1300d795c5d8f340570",
      time: 20000,
      type: "MTQ",
      answer: [0, 1, 2],
      deleted: false,
      options: [
        {
          text: "a",
          value: 0,
          _id: "6772592eda561e2de5c7c1d2",
        },
        {
          text: "b",
          value: 1,
          _id: "6772592eda561e2de5c7c1d3",
        },
        {
          text: "c",
          value: 2,
          _id: "6772592eda561e2de5c7c1d4",
        },
        {
          text: "d",
          value: 3,
          _id: "6772592eda561e2de5c7c1d5",
        },
      ],
      isPublic: false,
      createdAt: "2024-12-29T09:11:26.870Z",
      updatedAt: "2024-12-30T08:26:22.365Z",
      __v: 0,
    },
  ];

  return (
    <div className="p-4">
      <header className="flex w-full flex-col gap-2">
        <div className="w-full">
          <div className="w-1/2 bg-white border rounded-full h-8"></div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center gap-2">
            <div className="">
              <Select>
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Sắp xếp" className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Mới nhất</SelectItem>
                  <SelectItem value="1">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select>
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Sắp xếp" className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Mới nhất</SelectItem>
                  <SelectItem value="1">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="">
              <Select>
                <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
                  <SelectValue placeholder="Sắp xếp" className="" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">Mới nhất</SelectItem>
                  <SelectItem value="1">Cũ nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-4 py-4">
        <div className="col-span-5  overflow-x-hidden">
          <div className="bg-white border rounded-md">
            <InfiniteScroll
              dataLength={array.length} //This is important field to render the next data
              next={() => {
                console.log("hehe");
                setArray((prev) => {
                  const array = Array.from({ length: 10 });
                  return [...prev, ...array];
                });
              }}
              hasMore={true}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
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
              {response?.content?.map((item, index) => (
                <div
                  className="flex p-4 items-center justify-between border-b hover:bg-blue-200 cursor-pointer"
                  key={item._id}
                >
                  <div className="">
                    <h1>{item.name}</h1>
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
            </InfiniteScroll>
          </div>
        </div>
        <div className="col-span-7 ">
          <div className="max-h-[calc(100vh-100px)] h-full bg-white rounded-md border sticky top-20 overflow-y-auto">
            <div className="w-full h-16 border-b rounded-t-md flex items-center justify-between px-4 sticky top-0 bg-white">
              <div>
                <h4 className="hover:underline">Bài tập thứ nhất</h4>
                <div className="flex items-center text-xs text-gray-500 gap-2">
                  <span></span>
                  <span>*</span>
                  <span>10 câu hỏi</span>
                  <span>Khó</span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Button size={"sm"}>Bắt đầu</Button>
              </div>
            </div>

            <div className="px-4">
              {arr.map((data) => (
                <div className="border-t py-2" key={data._id}>
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      {data.type === "BLANK" ? (
                        <div className="border rounded-sm p-1 flex items-center gap-1">
                          <RectangleHorizontalIcon size={16} />
                          <span className="text-xs">Điền vào chỗ trống</span>
                        </div>
                      ) : (
                        <div className="border rounded-sm p-1 flex items-center gap-1">
                          <CheckIcon size={16} />
                          <span className="text-xs">Chọn đáp án đúng</span>
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
        </div>
      </div>
    </div>
  );
};

export default DiversityIndex;
