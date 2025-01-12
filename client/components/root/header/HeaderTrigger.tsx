"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import React from "react";

const HeaderTrigger = () => {
  return (
    <div className={cn("block lg:hidden")}>
      <SidebarTrigger className="p-2" />
    </div>
  );
};

export default HeaderTrigger;
