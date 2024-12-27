import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";
import { useDebounceCallback } from "usehooks-ts";
import { Input } from "../ui/input";

interface Props {
  handleChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  delay?: number;
}

const InputDebounce = ({
  handleChange,
  className,
  placeholder,
  delay = 500,
}: Props) => {
  const debounced = useDebounceCallback((inputValue: string) => {
    handleChange(inputValue);
  }, delay);
  return (
    <div className="relative">
      <Input
        onChange={(event) => debounced(event.target.value)}
        placeholder={placeholder}
        className={cn("pr-5", className)}
      />

      <div className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer">
        <SearchIcon size={16} />
      </div>
    </div>
  );
};

export default InputDebounce;
