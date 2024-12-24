import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";

interface IProps {
  className?: string;
}
const Logo = ({ className }: IProps) => {
  return (
    <div
      className={cn(
        "size-8 rounded-md bg-gradient-to-br from-blue-500 to-blue-300 flex items-center justify-center",
        className
      )}
    >
      <Image
        src={"/NUC.svg"}
        alt="logo"
        width={30}
        height={30}
        className="w-full h-full"
      />
    </div>
  );
};

export default Logo;
