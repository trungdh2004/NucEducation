import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, RotateCcwIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChangeSearch } from "@/types/system.type";
import { IPagingLesson } from "@/types/lesson.type";
import { format } from "date-fns";

interface IProps {
  handleChangeSearchObject: (value: ChangeSearch) => void;
  searchObject: IPagingLesson;
}

const HeaderReport = ({ searchObject, handleChangeSearchObject }: IProps) => {
  return (
    <div className="flex items-start sm:items-center justify-between w-full">
      <div className="gap-2 items-start sm:items-center justify-start pagination col-span-full flex flex-col  sm:flex-row w-full">
        <div className="text-sm font-semibold text-dark-4 mr-3 text-gray-500 flex  justify-between w-full sm:w-auto sm:block">
          <span>Lọc bởi:</span>
          <Button
            variant={"destructive"}
            className="size-8  sm:hidden"
            onClick={() => {
              handleChangeSearchObject({
                pageIndex: 1,
                pageSize: 5,
                typeRunning: 0,
                date: undefined,
              });
            }}
          >
            <RotateCcwIcon />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <div className="">
            <Select
              value={`${searchObject.typeRunning}`}
              onValueChange={(value) => {
                handleChangeSearchObject({
                  typeRunning: +value,
                });
              }}
            >
              <SelectTrigger className="w-[180px]  py-1 px-2 bg-white h-8">
                <SelectValue className="bg-white text-sm py-1 px-2" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="0">Tất cả bài học</SelectItem>
                  <SelectItem value="1">Đang chạy</SelectItem>
                  <SelectItem value="2">Hoàn thành</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[180px] shadow-sm py-1 px-2 bg-white h-8 border-black border text-black border-input text-sm hover:bg-gray-50"
                    // !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {searchObject?.date ? (
                    format(searchObject?.date, "dd/MM/yyyy")
                  ) : (
                    <span>Chọn ngày</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={searchObject?.date}
                  onSelect={(date) => {
                    handleChangeSearchObject({
                      date: date,
                    });
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>

      <div className="hidden sm:block">
        <Button
          variant={"destructive"}
          className="size-8"
          onClick={() => {
            handleChangeSearchObject({
              pageIndex: 1,
              pageSize: 5,
              typeRunning: 0,
              date: undefined,
            });
          }}
        >
          <RotateCcwIcon />
        </Button>
      </div>
    </div>
  );
};

export default HeaderReport;
