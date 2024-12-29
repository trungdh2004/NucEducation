import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, FileSymlinkIcon, SettingsIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { timeQuestion, typeQuestion } from "@/config/appQuestion";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Link from "next/link";
import { useParams } from "next/navigation";
interface IProps {
  quizId: string;
}
const HeaderQuestion = ({ quizId }: IProps) => {
  const form = useFormContext();
  const { id } = useParams();
  const handleCheckForm = (errors: Record<string, any>): boolean => {
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    
  },[])

  const handleMessage = (errors: Record<string, any>) => {
    const array = Object.keys(errors)
      .map((err) => {
        if (err === "query") {
          return {
            err: err,
            message: "Nhập câu hỏi",
            index: 1,
          };
        }

        if (err === "options") {
          return {
            err: err,
            message: "Chưa nhập câu trả lơi",
            index: 2,
          };
        }

        if (err === "answer") {
          return {
            err: err,
            message: "Chưa chọn câu đúng",
            index: 3,
          };
        }
      })
      .sort((a, b) => -1);

    const findData = array.find((data) => {
      if (data?.err === "query") return true;
      if (data?.err === "options") return true;
      if (data?.err === "answer") return true;
    });

    return findData?.message;
  };

  return (
    <div className="fixed top-0 left-0 ring-0 h-14 border-b bg-white w-full flex items-center justify-between px-4 z-20">
      <div className="flex items-center gap-4">
        <Link href={`/fullScreen/quiz/${quizId}/edit`}>
          <Button variant={"outline"} size={"sm"} type="button">
            <ChevronLeftIcon />
          </Button>
        </Link>

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  console.log("value", value);
                  if (value === "BLANK") {
                    form.setValue("options", [
                      {
                        text: "",
                        value: 0,
                      },
                    ]);
                    form.setValue("answer", [0]);
                  } else {
                    form.setValue("options", [
                      {
                        text: "",
                        value: 0,
                      },
                      {
                        text: "",
                        value: 1,
                      },
                      {
                        text: "",
                        value: 2,
                      },
                      {
                        text: "",
                        value: 3,
                      },
                    ]);
                    form.setValue("answer", []);
                  }
                  field.onChange(value);
                }}
              >
                <FormControl className="w-40">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {typeQuestion.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-center gap-2">
        <div>
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <Select
                  value={`${field.value}`}
                  onValueChange={(value) => {
                    field.onChange(+value);
                  }}
                >
                  <FormControl className="w-24">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {timeQuestion.map((item) => (
                      <SelectItem key={item.value} value={`${item.value}`}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
        </div>
        <HoverCard openDelay={0}>
          <HoverCardTrigger>
            <div className="relative group">
              <Button size={"sm"}>
                <FileSymlinkIcon size={20} /> Lưu câu hỏi
              </Button>
            </div>
          </HoverCardTrigger>
          <HoverCardContent
            className={cn(
              "w-40 p-1 bg-rose-500 text-white text-sm",
              handleCheckForm(form.formState.errors) && "hidden"
            )}
            side="bottom"
            align="end"
          >
            {handleMessage(form.formState.errors)}
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default HeaderQuestion;
