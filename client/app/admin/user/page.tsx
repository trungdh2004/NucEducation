import React from "react";
import UserTable from "./UserTable";

const page = () => {
  return (
    <div className="py-4 w-full">
      <h2 className="text-lg font-semibold mb-4">Danh sách người dùng</h2>
      <UserTable />
    </div>
  );
};

export default page;
