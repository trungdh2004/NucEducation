import React from "react";
import QuizTable from "./QuizTable";

const page = () => {
  return (
    <div className="py-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Danh sách bài tập</h2>
      <QuizTable />
    </div>
  );
};

export default page;
