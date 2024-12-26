import CategoryTable from "./CategoryTable";

const page = () => {
  return <div className="py-4 w-full">
    <h2 className="text-lg font-semibold mb-4">Danh sách môn học</h2>
    <CategoryTable />
  </div>;
};

export default page;
