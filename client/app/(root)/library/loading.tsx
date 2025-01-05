import React from "react";

const loading = () => {
  return (
    <div className="max-w-5xl mx-auto  grid grid-cols-12 gap-4 relative py-4 animate-pulse">
      <div className="col-span-12 sm:col-span-3 sticky top-0 px-2 space-y-2">
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
      </div>
      <div className="col-span-12 sm:col-span-9 space-y-2">
        <div className="w-full h-10 rounded-sm bg-gray-100"></div>
        <div className="w-full h-32 rounded-sm bg-gray-100"></div>
        <div className="w-full h-32 rounded-sm bg-gray-100"></div>
        <div className="w-full h-32 rounded-sm bg-gray-100"></div>
      </div>
    </div>
  );
};

export default loading;
