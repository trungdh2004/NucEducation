"use client";
import React from "react";
import SearchCode from "./SearchCode";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const SearchCodeClient = () => {
  const { isMobile } = useSidebar();

  return (
    <div className={cn(isMobile && "hidden")}>
      <SearchCode className="max-w-[200px]" />
    </div>
  );
};

export default SearchCodeClient;
