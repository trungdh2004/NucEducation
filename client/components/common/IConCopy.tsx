import { cn } from "@/lib/utils";
import { Check, CopyIcon } from "lucide-react";
import React, { useState } from "react";

const IConCopy = ({
  value,
  className,
}: {
  value: string;
  className?: string;
}) => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(value).then(() => {
        setIsCopy(true);

        setTimeout(() => {
          setIsCopy(false);
        }, 1000);
      });
    }
  };

  return (
    <button
      className={cn(
        "size-8 rounded-sm  flex items-center justify-center border",
        className
      )}
      onClick={handleCopy}
      disabled={isCopy}
    >
      {isCopy ? <Check size={20} /> : <CopyIcon size={20} />}
    </button>
  );
};

export default IConCopy;
