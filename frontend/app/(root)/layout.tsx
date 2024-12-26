import Header from "@/components/root/header/Header";
import { AppSidebar } from "@/components/root/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider className="flex w-full min-h-screen">
      <AppSidebar />
      <div className="w-full lg:pl-[--sidebar-width] bg-main">
        <Header />
        <div className="p-2 w-full min-h-screen">{children}</div>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
