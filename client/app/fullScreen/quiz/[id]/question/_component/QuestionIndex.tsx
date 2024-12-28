"use client";
import React from "react";
import HeaderQuestion from "./HeaderQuestion";
import { Image, ImagePlusIcon, Trash2 } from "lucide-react";
import TooltipComponent from "@/components/common/TooltipComponent";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { z } from "zod";

const formSchema = z.object({
  query: z.object({
    text: z.string().trim().min(1, {
      message: "Chưa nhập tên ",
    }),
    image: z.string().trim().optional(),
  }),
  time: z.number().max(10000),
  answer: z.number().array(),
  quizId: z.string().trim().optional(),
  options: z.array(
    z.object({
      text: z.string().trim().min(1, {}),
      value: z.number(),
    })
  ),
  type: z.enum(["MTQ", "SGQ", "BLANK"]),
});

const QuestionIndex = () => {
  return (
    <form className="w-full ">
      <HeaderQuestion />
      <section className="w-full h-screen pt-20 pb-8">
        <div className=" max-w-5xl mx-auto bg-sky-800 border rounded-md h-full max-h-[calc(100vh-120px)] p-4">
          <div className="h-full w-full flex flex-col">
            <div className="rounded-lg h-56 text-light-3 relative flex flex-col border-light-20% w-full border p-2">
              <div className="flex w-full">
                <TooltipComponent label="Thêm hình ảnh">
                  <button className="p-1 border rounded-sm text-white bg-gray-50/30">
                    <ImagePlusIcon size={12} />
                  </button>
                </TooltipComponent>
              </div>
              <div className="flex-1 mt-2 flex items-center gap-2">
                <div className="h-full aspect-square border rounded-md overflow-hidden"></div>
                <div className="flex-1 h-full">
                  <Textarea
                    className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-2xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                    placeholder="Nhập câu hỏi tại đây !!!"
                  />
                </div>
              </div>
            </div>

            <div className="flex-1 w-full mt-4">
              <div className="grid w-full h-full grid-cols-4 gap-2">
                <div className="w-full h-full rounded-md p-1 flex flex-col bg-green-700">
                  <div className="h-8 w-full flex items-center justify-between">
                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>

                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>
                  </div>

                  <div className="w-full flex-1 mt-1">
                    <Textarea
                      className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                      placeholder="Nhập câu hỏi tại đây !!!"
                    />
                  </div>
                </div>
                <div className="w-full h-full rounded-md p-1 flex flex-col bg-orange-700">
                  <div className="h-8 w-full flex items-center justify-between">
                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>

                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>
                  </div>

                  <div className="w-full flex-1 mt-1">
                    <Textarea
                      className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                      placeholder="Nhập câu hỏi tại đây !!!"
                    />
                  </div>
                </div>
                <div className="w-full h-full rounded-md p-1 flex flex-col bg-yellow-600">
                  <div className="h-8 w-full flex items-center justify-between">
                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>

                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>
                  </div>

                  <div className="w-full flex-1 mt-1">
                    <Textarea
                      className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                      placeholder="Nhập câu hỏi tại đây !!!"
                    />
                  </div>
                </div>
                <div className="w-full h-full rounded-md p-1 flex flex-col bg-pink-600">
                  <div className="h-8 w-full flex items-center justify-between">
                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>

                    <div className="p-1 rounded-sm border text-white">
                      <Trash2 size={14} />
                    </div>
                  </div>

                  <div className="w-full flex-1 mt-1">
                    <Textarea
                      className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                      placeholder="Nhập câu hỏi tại đây !!!"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="h-10 w-full  mt-4">
              <Tabs defaultValue="account" className="h-full ">
                <TabsList className="bg-[#09090980] text-sm">
                  <TabsTrigger value="account">
                    Câu trả lời duy nhất
                  </TabsTrigger>
                  <TabsTrigger value="password">
                    Nhiều câu trả lời đúng
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default QuestionIndex;
