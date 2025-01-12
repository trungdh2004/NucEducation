import HeaderTrigger from "@/components/root/header/HeaderTrigger";
import HeaderUser from "@/components/root/header/HeaderUser";
import React from "react";

const HeaderAdmin = () => {
  return (
    <div className="flex items-center px-2 md:px-4 lg:px-6 w-full  h-14 border-b sticky top-0 bg-main justify-between z-50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <HeaderTrigger />
        {/* <h3 className="uppercase font-semibold text-md">Trang quản trị</h3> */}
      </div>
      <div>
        <HeaderUser isAdmin={true} />
      </div>
    </div>
  );
};

export default HeaderAdmin;
