import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, FileSymlinkIcon, SettingsIcon } from "lucide-react";
import React from "react";

const HeaderQuiz = () => {
  return (
    <div className="fixed top-0 left-0 ring-0 h-14 border-b bg-white w-full flex items-center justify-between px-4 z-20">
      <div className="flex items-center gap-4">
        <Button variant={"outline"} size={"sm"}>
          <ChevronLeftIcon />
        </Button>

        <div className="max-w-60 truncate cursor-pointer text-nowrap text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-md px-2 py-2">
          Xin chào mọi người tôi là trung hihi hehe ahha
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button size={"sm"} variant={"outline"}>
          <SettingsIcon size={20} /> Cài đặt
        </Button>
        <Button size={"sm"}>
          <FileSymlinkIcon size={20} /> Xuất bản
        </Button>
      </div>
    </div>
  );
};

export default HeaderQuiz;
