"use client";
import { joinCodeLessonApi } from "@/actions/lesson.action";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { DoorOpenIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  code: z
    .string()
    .min(1, {
      message: "Username must be at least 2 characters.",
    })
    .max(8, {
      message: "Phỉa đủ 8 kí tự",
    }),
});

const SearchCode = ({ className }: { className?: string }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const lesson = await joinCodeLessonApi(values.code);
      router.push(`/fullScreen/join/${lesson?._id}`);
    } catch (error: unknown) {
      console.log("error", error);

      toast.error("Không tìm thấy");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex items-center border px-1 rounded-md shadow-sm h-9 w-full border-blue-500",
          className,
          form.formState.errors.code && "border-rose-500"
        )}
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl className="flex-1">
                <Input
                  placeholder="Nhập"
                  {...field}
                  maxLength={8}
                  className="border-none pl-1 border-r"
                  onChange={(e) => {
                    const value = e.target.value;
                    field.onChange(
                      value ? value.trim().toLocaleUpperCase() : ""
                    );
                  }}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <div
          className={cn(
            "w-[2px] h-3/5 bg-blue-500/50 mr-1",
            form.formState.errors.code && "bg-rose-500"
          )}
        ></div>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              type="submit"
              className=" px-1 text-sm  py-1 rounded-sm text-blue-500 bg-blue-50 hover:bg-blue-100 "
            >
              {/* Tham gia */}
              <DoorOpenIcon size={20} />
            </button>
          </TooltipTrigger>
          <TooltipContent
            side="bottom"
            align="center"
            className="text-blue-500 bg-blue-50 shadow-sm"
          >
            Tham gia
          </TooltipContent>
        </Tooltip>
      </form>
    </Form>
  );
};

export default SearchCode;
