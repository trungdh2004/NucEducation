import { FormControl, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import React from "react";
import { useFormContext } from "react-hook-form";

const QuestionBlank = () => {
  const form = useFormContext();

  return (
    <div className="flex-1 w-full mt-4 flex flex-col ">
      <div className=" py-6 flex flex-col gap-4 items-center justify-center w-full h-24 bg-black/20 answer-container relative rounded-lg border]">
        <FormField
          control={form.control}
          name="options.0.text"
          render={({ field }) => (
            <div className="w-full max-w-[320px] md:max-w-[600px] mx-auto bg-gray-50/10 relative">
              <FormControl>
                <Input
                  className={cn(
                    "w-full text-white border-t-0 border-l-0 border-r-0 border-b-2 rounded-b-none rounded-t-sm pr-12"
                    // form.formState.errors.options.[1]
                  )}
                  {...field}
                  maxLength={64}
                />
              </FormControl>
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-11 h-6 flex items-center justify-center border-l text-xs font-semibold text-blue-200">
                {form.watch("options.0.text").length || 0} / 64
              </div>
            </div>
          )}
        />
      </div>
      <div className=" flex flex-col gap-4 items-center justify-center w-full min-h-24 h-full mt-4 bg-black/20 relative rounded-lg overflow-y-auto border">
        <h3 className="text-white text-lg">Chế độ xem khi thi</h3>
        <div className="w-full max-w-[320px] md:max-w-[600px] mx-auto bg-gray-50/10 p-2 border-b-2 text-gray-500">
          Gõ câu trả lời của bạn
        </div>
      </div>
    </div>
  );
};

export default QuestionBlank;
