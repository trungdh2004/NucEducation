import CategoryTable from "./CategoryTable";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Danh sách môn học",
  description: "Quản lí danh sách các môn học tại NucEducation",
};

const page = () => {
  return (
    <div className="py-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Danh sách môn học</h2>
      <CategoryTable />
    </div>
  );
};

export default page;
