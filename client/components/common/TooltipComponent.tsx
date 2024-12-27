import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface Props {
  children: React.ReactNode;
  label: string;
  className?: string;
}

const TooltipComponent = ({ label, className, children }: Props) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className={className}>{label}</TooltipContent>
    </Tooltip>
  );
};

export default TooltipComponent;
