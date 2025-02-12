"use client";

import { useLoadingModel } from "@/store/useLoadingModel";
import { Loader2Icon } from "lucide-react";
import { Dialog, DialogContent } from "../ui/dialog";

const ModelLoading = () => {
  const { open } = useLoadingModel();
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="hiddenClose bg-transparent border-none p-0 shadow-none flex flex-col items-center" >
        <div className="flex items-center justify-center">
          <Loader2Icon size={40} className="text-blue-500 animate-spin" />
        </div>
        <p className="text-white">Bạn vui lòng chờ chút ....</p>
      </DialogContent>
    </Dialog>
  );
};

export default ModelLoading;
