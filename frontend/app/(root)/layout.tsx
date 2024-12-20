import Header from "@/components/root/header/Header";
import { AppSidebar } from "@/components/root/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-x-hidden">
        <Header />
        <div className="p-2 w-full min-h-screen overflow-x-hidden bg-[rgba(249,250,251,0.8)]">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
};

export default Layout;
