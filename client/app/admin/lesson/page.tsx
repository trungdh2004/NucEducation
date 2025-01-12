import React from "react";
import LessonTable from "./LessonTable";

const page = () => {
  return (
    <div className="py-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Danh sách cuộc chơi</h2>
      <LessonTable />
    </div>
  );
};

export default page;
