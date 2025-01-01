import React from "react";

const QuizLoading = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 ring-0 h-14 border-b bg-white w-full flex items-center justify-between px-2 sm:px-4 z-20 animate-pulse">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 h-10 w-10 rounded-md "></div>
          <div className="bg-gray-100 h-10 w-40 rounded-md hidden sm:block"></div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
          <div className="bg-gray-100 h-10 w-20 rounded-md"></div>
        </div>
      </div>

      <div className="py-16 block px-2 lg:grid lg:px-0 grid-cols-12">
        <div className="block lg:col-span-10 lg:col-start-2 lg:grid gap-4 relative items-start mt-4">
          <section className="col-span-9 col-start-4  order-2 animate-pulse">
            <div className="w-full rounded-md p-2 h-10 bg-gray-100  flex justify-between items-center sticky top-14"></div>

            <div className="h-40 w-full rounded-md bg-gray-100 mt-4"></div>
            <div className="h-40 w-full rounded-md bg-gray-100 mt-4"></div>
            <div className="h-40 w-full rounded-md bg-gray-100 mt-4"></div>
          </section>
          <article className="pt-4 relative top-0 md:pt-0 col-span-3 col-start-1  order-1 overflow-y-auto md:sticky md:top-20 flex flex-col gap-2 animate-pulse">
            <div className="w-full h-20 bg-gray-100 rounded-md p-2  ">
              <div className="flex items-center gap-2"></div>
            </div>
            <div className="w-full h-10 bg-gray-100 rounded-md"></div>
            <div className="w-full h-20 bg-gray-100 rounded-md p-2  ">
              <div className="flex items-center gap-2"></div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default QuizLoading;
