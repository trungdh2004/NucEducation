"use client";
import IConCopy from "@/components/common/IConCopy";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LessonResponseReview } from "@/types/lesson.type";
import { QRCodeSVG } from "qrcode.react";
import React from "react";

const ReportsJoin = ({ lesson }: { lesson: LessonResponseReview }) => {
  return (
    <div className="md:col-start-2 col-span-12 md:col-span-10  md:shadow-md md:rounded-lg bg-white">
      <Accordion type="single" collapsible={true} defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger className="p-4 bg-blue-500 rounded-t-md text-white">
            <div className="">
              <h2 className="text-lg font-semibold">Mời người tham gia</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="p-4  md:p-6 flex flex-col md:flex-row justify-center ">
            <div className="w-full md:w-3/5">
              <p className="mb-4 text-sm">Mời qua mã game</p>
              <div className="w-full flex justify-between gap-3 my-2">
                <div className="flex-grow flex-1 text-gray-500">
                  <p className="mb-1 text-[10px] font-semibold">Bước 1</p>
                  <p className="mb-1 text-xs">Sử dụng thiết bị để mở</p>
                  <p className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-base md:text-lg font-semibold">
                    nuceducation.com
                  </p>
                </div>
                <div className="flex-grow flex-1 text-gray-500">
                  <p className="mb-1 text-[10px] font-semibold">Bước 2</p>
                  <p className="mb-1 text-xs">Nhập mã tham gia</p>
                  <p className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-base md:text-lg font-semibold flex items-center gap-2 justify-center">
                    <span>{lesson.code}</span>
                  </p>
                </div>
              </div>
              <div className="w-full py-1 border border-blue-500 text-center bg-blue-100 rounded-md text-blue-500 text-lg font-semibold flex items-center px-3 gap-2">
                <p className="text-base md:text-lg font-semibold flex-1 line-clamp-1 text-start">
                  {window?.location?.origin &&
                    window?.location.origin + "/fullScreen/join/" + lesson?._id}
                </p>

                <IConCopy
                  value={
                    window?.location?.origin &&
                    window?.location.origin + "/fullScreen/join/" + lesson?._id
                  }
                  className="border-blue-500 size-6 md:size-8 text-sm "
                />
              </div>
            </div>
            <div className="border-t md:border-l my-4 md:mx-7 "></div>
            <div className="w-full md:w-2/5">
              <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-2">
                <p className="">Mã QR</p>
                <div className="size-28 md:size-40 border rounded flex items-center justify-center">
                  <QRCodeSVG
                    value={`${window?.location?.origin}/fullScreen/join/${lesson?._id}`}
                    level={"H"}
                    size={150}
                    bgColor={"transparent"}
                    fgColor={"#000"}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ReportsJoin;
