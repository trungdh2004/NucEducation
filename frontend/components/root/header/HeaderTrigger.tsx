"use client";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

const HeaderTrigger = () => {
  const { isMobile } = useSidebar();
  return (
    <div className={cn(isMobile ? "block" : "hidden")}>
      <SidebarTrigger className="p-2" />
    </div>
  );
};

export default HeaderTrigger;
