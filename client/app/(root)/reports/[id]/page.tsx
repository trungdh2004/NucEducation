import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  CalendarDaysIcon,
  CircleCheckIcon,
  CircleHelpIcon,
  CirclePlayIcon,
  CopyIcon,
  ListCheck,
  TargetIcon,
} from "lucide-react";
import React from "react";

const page = () => {
  return (
    <div className="w-full h-full">
      <header className="flex items-center justify-between py-2 px-4">
        <div className="flex items-center justify-start flex-wrap">
          <h2 className="text-xl font-semibold ">XIn chào mọi người</h2>

          <div className="px-3 flex items-center py-1 border rounded-sm ml-4 text-xs  bg-white gap-2">
            <div className="size-2 rounded-full bg-red-500"></div>
            <span className="">Hoàn thành</span>
          </div>
        </div>
        <div className="px-3 py-1 rounded text-xs border bg-rose-200 text-rose-500 border-rose-500">
          Kết thúc
        </div>
      </header>

      <section className="w-full pb-3 px-4">
        <div className="text-xs text-gray-600 flex items-center gap-2">
          <span>
            <CalendarDaysIcon size={12} />
          </span>
          <span>Đã bắt đầu :</span>
          <span>12/12/2024</span>
        </div>
      </section>

      <div className="grid grid-cols-12 max-w-7xl gap-4 md:gap-6 p-4 h-fit relative">
        <div className="md:col-start-2 col-span-full md:col-span-10  md:shadow-md md:rounded-lg bg-white">
          <Accordion type="single" collapsible={true}>
            <AccordionItem value="item-1">
              <AccordionTrigger className="p-4 bg-blue-500 rounded-t-md text-white">
                <div className="">
                  <h2 className="text-lg font-semibold">Mời người tham gia</h2>
                </div>
              </AccordionTrigger>
              <AccordionContent className="md:p-6 flex justify-center ">
                <div className="w-full md:w-3/5">
                  <p className="mb-4 text-sm">Mời qua mã game</p>
                  <div className="w-full flex justify-between gap-3 my-2">
                    <div className="flex-grow flex-1 text-gray-500">
                      <p className="mb-1 text-[10px] font-semibold">Bước 1</p>
                      <p className="mb-1 text-xs">Sử dụng thiết bị để mở</p>
                      <p className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-lg font-semibold">
                        NucEducation.com
                      </p>
                    </div>
                    <div className="flex-grow flex-1 text-gray-500">
                      <p className="mb-1 text-[10px] font-semibold">Bước 2</p>
                      <p className="mb-1 text-xs">Nhập mã tham gia</p>
                      <p className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-lg font-semibold flex items-center gap-2 justify-center">
                        <span>1234</span>
                        <span>4567</span>
                      </p>
                    </div>
                  </div>
                  <div className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-lg font-semibold flex items-center px-3 gap-2">
                    <p className="text-lg font-semibold flex-1 line-clamp-1 text-start">
                      http://localhost:3000/reports/123456
                    </p>

                    <div className="h-full w-5 flex items-center cursor-pointer">
                      <CopyIcon size={20} />
                    </div>
                  </div>
                </div>
                <div className="border-l mx-7 "></div>
                <div className="w-2/5">
                  <div className="w-full h-full flex items-center justify-center gap-2">
                    <p className="">Mã QR</p>
                    <div className="size-40 border rounded"></div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>

        <div className="col-span-full flex flex-col justify-center bg-white border rounded-lg">
          <div className="w-full py-4 px-6 flex  border-b bg-gray-50 rounded-t-lg justify-between">
            <div
              className={cn(
                "flex items-center border-l-4 rounded max-h-min text-[10px] max-w-[150px] px-3 py-2 overflow-ellipsis whitespace-nowrap async bg-green-200 border-green-500 text-green-600"
              )}
            >
              <ListCheck size={14} className="mr-2" />
              <span className="text-xs leading-3">Trực tiếp</span>
            </div>

            <div className="px-3 py-2 rounded border text-sm bg-gray-100 cursor-pointer">
              Xem câu hỏi
            </div>
          </div>
          <div className=" w-full bg-white  rounded-b-lg">
            <div className="p-4 grid grid-cols-4 gap-4 ">
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <TargetIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">20%</h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CircleCheckIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">20%</h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CirclePlayIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">20%</h4>
                </div>
              </div>
              <div className="col-span-1 border p-3 flex items-center rounded-md">
                <div className="size-12 flex items-center justify-center bg-gray-100/80 text-black rounded mr-3">
                  <CircleHelpIcon size={20} />
                </div>
                <div className="flex flex-col items-start space-y-1">
                  <span className="text-xs text-gray-500 font-semibold">
                    Câu đúng
                  </span>
                  <h4 className="text-xl font-semibold ">20%</h4>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-full flex flex-col justify-center bg-white border rounded-lg overflow-hidden">
          <Tabs defaultValue="account" className="w-full bg-gray-50 rounded-lg">
            <TabsList className=" w-full  h-10 rounded-b-none justify-start flex items-center px-4 bg-white rounded-t-lg">
              <TabsTrigger
                value="account"
                className="border-b-4 rounded-none shadow-none border-transparent data-[state=active]:bg-white data-[state=active]:text-foreground data-[state=active]:shadow-none data-[state=active]:border-blue-500 min-w-32"
              >
                Người chơi
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="border-b-4 rounded-none border-transparent data-[state=active]:bg-white data-[state=active]:text-foreground  data-[state=active]:border-blue-500 shadow-none data-[state=active]:shadow-none min-w-32"
              >
                Câu hỏi
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="w-full p-6 bg-gray-50">
              <div className="w-full p-2 flex items-center justify-end gap-3 bg-white rounded-md border">
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-sm bg-green-500"></div>
                  <span className="text-sm text-gray-500 leading-4">
                    Câu đúng
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-4 rounded-sm bg-rose-500"></div>
                  <span className="text-sm text-gray-500 leading-4">Sai</span>
                </div>
              </div>

              <div className="mt-2"></div>
            </TabsContent>
            <TabsContent value="password">
              <div>hihi</div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default page;
