"use client";
import { pagingQuizApi } from "@/actions/quiz.action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IQuizResponse } from "@/types/quizz.type";
import { ChangeSearch, Response, SearchQuizPaging } from "@/types/system.type";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import LibraryQuizItem from "./LibraryQuizItem";
import Paginations from "@/components/common/Pagination";
import LibrarySidebar from "./LibrarySidebar";

const LibraryQuizList = () => {
  const [searchObject, setSearchObject] = useState<SearchQuizPaging>({
    pageIndex: 1,
    pageSize: 5,
    isPublic: undefined,
    sort: -1,
  });
  const [response, setResponse] = useState<Response<IQuizResponse>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [loading, setLoading] = useState(true);

  const handlePaging = async (request: SearchQuizPaging) => {
    try {
      setLoading(true);
      const data = await pagingQuizApi(request);
      setResponse(data);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeSearch = (value: ChangeSearch) => {
    const valueOld = searchObject;

    const searchNew = {
      ...valueOld,
      ...value,
    };
    setSearchObject(searchNew);
    handlePaging(searchNew);
  };

  useEffect(() => {
    handlePaging(searchObject);
  }, []);

  return (
    <div className="max-w-5xl mx-auto  grid grid-cols-12 gap-4 relative py-4">
      <LibrarySidebar
        handleChangeSearch={handleChangeSearch}
        searchObject={searchObject}
      />
      <div className="col-span-12 sm:col-span-9">
        <header className="h-8 w-full flex justify-end mb-4">
          <Select
            onValueChange={(value) => {
              const sort = value === "-1" ? -1 : 1;
              handleChangeSearch({
                sort: sort,
              });
            }}
          >
            <SelectTrigger className="w-[100px] text-xs px-2 py-1 h-6 cursor-pointer bg-white">
              <SelectValue placeholder="Sắp xếp" className="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-1">Mới nhất</SelectItem>
              <SelectItem value="1">Cũ nhất</SelectItem>
            </SelectContent>
          </Select>
        </header>

        <div className="w-full flex flex-col gap-3">
          {response?.content?.length === 0 && !loading && (
            <div className="w-ful h-28 rounded-md bg-white border box-shadow flex items-center justify-center">
              Chưa có bài tập nào
            </div>
          )}
          {response?.content?.length > 0 && !loading && (
            <div>
              <div className="flex flex-col gap-2">
                {response.content.map((item) => (
                  <LibraryQuizItem key={item._id} data={item} />
                ))}
              </div>

              <div className="mt-2">
                <Paginations
                  pageCount={response.totalPages}
                  forcePage={searchObject.pageIndex - 1}
                  handlePageClick={(value) => {
                    console.log("value change", value);
                    handleChangeSearch({
                      pageIndex: value.selected + 1,
                    });
                  }}
                  size="sm"
                />
              </div>
            </div>
          )}

          {loading && (
            <>
              <div className="animate-pulse bg-slate-50 box-shadow border w-full h-32 rounded-md flex p-2 gap-2 mb-2">
                <div className="size-28 bg-gray-100 rounded-md"></div>
                <div className="flex-1 h-full flex flex-col justify-between gap-2">
                  <div className="h-8 w-20 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-64 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-40 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-20 bg-gray-100 rounded-sm"></div>
                </div>
              </div>
              <div className="animate-pulse bg-slate-50 box-shadow border w-full h-32 rounded-md flex p-2 gap-2 ">
                <div className="size-28 bg-gray-100 rounded-md"></div>
                <div className="flex-1 h-full flex flex-col justify-between gap-2">
                  <div className="h-8 w-20 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-64 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-40 bg-gray-100 rounded-sm"></div>
                  <div className="h-8 w-20 bg-gray-100 rounded-sm"></div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LibraryQuizList;
