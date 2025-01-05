import React from "react";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center pt-16">
      <div className="max-w-xl w-full h-[calc(100vh-100px)] p-4 rounded-md bg-gray-600/70 space-y-4 animate-pulse flex flex-col">
        <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
        <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
          <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
          <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
          <div className="w-full h-20 rounded-md bg-gray-800/80"></div>
        </div>

        <div className="flex-1 w-full rounded-md bg-gray-800/80"></div>
      </div>
    </div>
  );
};

export default Loading;
