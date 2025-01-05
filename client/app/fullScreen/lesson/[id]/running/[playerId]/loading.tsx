import React from "react";

const loading = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center animate-pulse px-2">
      <div className="fixed top-0 h-16 left-0 bg-gray-600/50 w-full"></div>
      <div className="w-full h-[calc(100vh-136px)] mt-16 p-4">
        <div className="w-full h-full flex flex-col gap-2">
          <div className="h-1/2 w-full flex flex-col">
            <div className="w-full relative flex items-center justify-center py-3 h-full transition-all duration-300 ">
              <div className="max-sm:w-full min-w-[60%] filter backdrop-blur-md border border-gray-600 relative sm:h-min h-fit rounded-md py-4 bg-gray-600/50">
                <div className="h-20"></div>
              </div>
            </div>
          </div>
          <div className="h-1/2 w-full flex flex-col">
            <div className="flex gap-2 h-full">
              <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
              <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
              <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
              <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
