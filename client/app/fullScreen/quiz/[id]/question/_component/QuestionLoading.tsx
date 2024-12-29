import { cn } from "@/lib/utils";
import React from "react";

const QuestionLoading = () => {
  return (
    <div className="w-full min-h-screen">
      <div className="fixed top-0 left-0 ring-0 h-14 border-b bg-white w-full flex items-center justify-between px-4 z-20 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 h-10 w-10 rounded-md "></div>
          <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 h-10 w-10 rounded-md "></div>
          <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
          <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
        </div>
      </div>

      <section className="w-full h-screen pt-20 pb-8 animate-pulse">
        <div className=" max-w-5xl mx-auto bg-gray-100 border rounded-md h-full max-h-[calc(100vh-120px)] p-4">
          <div className="h-full w-full flex flex-col">
            <div className="rounded-lg h-56 text-light-3 bg-gray-200 relative flex flex-col border-light-20% w-full border p-2"></div>
            <div className="flex-1 w-full mt-4 flex flex-col">
              <div className="w-full flex-1 flex flex-col sm:flex-row gap-2">
                <div
                  className={cn("grid flex-1 grid-cols-1 sm:grid-cols-4 gap-2")}
                >
                  <div className="w-full h-full rounded-md p-1 flex flex-row sm:flex-col gap-1 bg-gray-200"></div>
                  <div className="w-full h-full rounded-md p-1 flex flex-row sm:flex-col gap-1 bg-gray-200"></div>
                  <div className="w-full h-full rounded-md p-1 flex flex-row sm:flex-col gap-1 bg-gray-200"></div>
                  <div className="w-full h-full rounded-md p-1 flex flex-row sm:flex-col gap-1 bg-gray-200"></div>
                </div>
              </div>
            </div>
            <div className="h-10 w-full flex gap-2 mt-4">
              <div className="w-20 h-full bg-gray-200 rounded-md"></div>
              <div className="w-20 h-full bg-gray-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuestionLoading;
