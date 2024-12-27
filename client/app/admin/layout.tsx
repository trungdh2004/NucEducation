import HeaderAdmin from "@/components/admin/header/HeaderAdmin";
import { SidebarAdmin } from "@/components/admin/SidebarAdmin";
import ModelLoading from "@/components/common/ModelLoading";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex w-full min-h-screen bg-main relative">
      <SidebarAdmin />
      <div className="w-full lg:pl-[--sidebar-width] ">
        {/* <Header /> */}
        <HeaderAdmin />
        <div className="px-2 md:px-4 lg:px-6 w-full ">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
