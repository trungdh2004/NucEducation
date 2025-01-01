"use client";

import { geminiQuestionApi } from "@/actions/gemini.action";
import { cn } from "@/lib/utils";
import { IQuestionAi } from "@/types/question.type";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckIcon,
  Circle,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleXIcon,
  LoaderIcon,
  RectangleHorizontalIcon,
  SendHorizontalIcon,
  SparklesIcon,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";
import { Sheet, SheetContent, SheetHeader } from "../ui/sheet";

const formSchema = z.object({
  text: z.string().min(2).max(50),
});

interface IProps {
  open: boolean;
  handleClose: () => void;
  handleCreate: (value: IQuestionAi[]) => void;
}
const SheetGemini = ({ open, handleClose, handleCreate }: IProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const [listChecked, setListChecked] = useState<IQuestionAi[]>([]);
  const [loading, setLoading] = useState(false);
  const [dataAi, setDataAi] = useState<IQuestionAi[]>([]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const res = await geminiQuestionApi(values.text);
      setDataAi(res);
    } catch (error: unknown) {
      const err = error as Error;
      console.log("err", err);

      toast.error("Lỗi gemini");
    } finally {
      setLoading(false);
    }
  }

  const handleChecked = (value: IQuestionAi, checked: boolean) => {
    if (checked) {
      setListChecked((prev) => {
        const arr = [...prev, value];
        return arr;
      });
    } else {
      setListChecked((prev) => {
        const arr = prev.filter((item) => item._id !== value._id);
        return arr;
      });
    }
  };

  const onClose = () => {
    setListChecked([]);
    handleClose();
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="max-w-[400px] sm:max-w-[540px] lg:max-w-[600px] p-0 border-0 bg-gray-100 flex flex-col space-y-0 gap-0 ">
        <SheetHeader className="bg-[url('/gemini.png')] h-[120px] text-white p-4">
          <h4 className="text-white">
            Tạo đa dạng câu hỏi kiểm tra bằng Ai Gemini
          </h4>

          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <div className="flex items-center bg-white w-full rounded-md p-1">
                  <div className="text-blue-600 px-1">
                    <SparklesIcon size={20} />
                  </div>
                  <FormField
                    control={form.control}
                    name="text"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Điền yêu cầu câu hỏi"
                            {...field}
                            className="w-full border-none shadow-none text-black"
                            autoFocus
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size={"icon"}>
                    <SendHorizontalIcon />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetHeader>
        <div className="w-full h-full p-2 overflow-y-auto relative">
          <div className=" py-2 flex items-center gap-2">
            <CircleHelpIcon size={20} />
            <p>Các câu hỏi được AI khởi tạo</p>
          </div>
          {dataAi.length === 0 && (
            <div className="w-full h-40 flex items-center justify-center bg-white rounded-md">
              Chưa có câu hỏi nào
            </div>
          )}

          {dataAi.length > 0 &&
            dataAi?.map((data, index) => (
              <div
                className="w-full rounded-sm p-2 bg-white mb-4 border"
                key={data._id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <div className="border rounded-sm p-1">
                      <Circle size={12} />
                    </div>
                    {data.type === "BLANK" ? (
                      <div className="border rounded-sm p-1 flex items-center gap-1">
                        <RectangleHorizontalIcon size={16} />
                        <span className="text-xs">
                          {index}: Điền vào chỗ trống
                        </span>
                      </div>
                    ) : (
                      <div className="border rounded-sm p-1 flex items-center gap-1">
                        <CheckIcon size={16} />
                        <span className="text-xs">
                          {index + 1}: Chọn đáp án đúng
                        </span>
                      </div>
                    )}
                  </div>
                  <div className=" items-center gap-1 hidden sm:flex">
                    <Checkbox
                      onCheckedChange={(value: boolean) => {
                        handleChecked(data, value);
                      }}
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-wrap">
                    <strong>Câu hỏi:</strong> {data.query.text}
                  </p>
                </div>
                <div className="mt-2">
                  <div className="flex items-center px-2 pb-2">
                    <h4 className="text-xs text-slate-400">Lựa chọn trả lời</h4>
                    <p className="flex-1 w-full h-[1px] bg-gray-100 ml-2"></p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {data.options.map((option, i) => (
                      <div className="w-full flex items-start gap-2" key={i}>
                        {data.answer.includes(option.value) ? (
                          <CircleCheckIcon
                            size={20}
                            className="text-green-500"
                          />
                        ) : (
                          <CircleXIcon size={20} className="text-rose-500" />
                        )}

                        <div className="flex-1 w-full text-sm text-ellipsis">
                          {option.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div className="w-full bg-white flex flex-row justify-between p-2 items-center border-t">
          <div>
            <span className="text-sm">Chọn câu hỏi </span>
          </div>
          <div className="gap-2 flex items-center">
            <Button size={"sm"} variant={"secondary"} onClick={onClose}>
              Hủy
            </Button>
            <Button
              size={"sm"}
              disabled={listChecked.length === 0}
              onClick={() => {
                handleCreate(listChecked);
                onClose();
              }}
            >
              Xác nhận
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "absolute inset-0 bg-black/20  items-center justify-center flex-col hidden",
            loading && "flex"
          )}
        >
          <h4 className="mb-2 text-blue-500 text-lg font-semibold">
            Gemini đang tạo câu hỏi...
          </h4>
          <div>
            <LoaderIcon size={20} className="text-blue-500 animate-spin" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SheetGemini;
