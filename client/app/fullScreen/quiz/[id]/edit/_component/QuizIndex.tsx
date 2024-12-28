import { Button } from "@/components/ui/button";
import {
  ChevronRightIcon,
  Circle,
  CircleCheckIcon,
  CircleXIcon,
  CopyIcon,
  FileSpreadsheetIcon,
  FolderDownIcon,
  PencilIcon,
  PlusIcon,
  RectangleHorizontalIcon,
  Search,
  SparklesIcon,
  Trash2Icon
} from "lucide-react";
import Image from "next/image";
import HeaderQuiz from "./HeaderQuiz";

const QuizIndex = () => {
  return (
    <div className="w-full bg-main min-h-screen">
      <HeaderQuiz />
      <div className="py-16 grid grid-cols-12">
        <div className="col-span-10 col-start-2  grid grid-cols-12 gap-4 relative items-start mt-4">
          <section className="col-span-9 col-start-4  order-2">
            <div className="w-full border rounded-md p-2 bg-white box-shadow flex justify-between items-center sticky top-14">
              <div className="text-lg font-semibold">4 câu hỏi</div>
              <div className="flex gap-2">
                <Button variant={"outline"} size={"sm"}>
                  <Search size={16} />
                  Tìm kiếm câu hỏi
                </Button>
                <Button variant={"outline"} size={"sm"}>
                  <PlusIcon size={16} />
                  Thêm câu hỏi
                </Button>
              </div>
            </div>

            <div className="w-full rounded-sm p-2 bg-white mt-4 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="border rounded-sm p-1">
                    <Circle size={12} />
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1">
                    <RectangleHorizontalIcon size={16} />
                    <span className="text-xs">Điền vào chỗ trống</span>
                  </div>
                  <div className="border rounded-sm p-1 text-xs">30 giây</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-gray-50 ">
                    <CopyIcon size={14} />
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500">
                    <PencilIcon size={14} />
                    <span className="text-xs">Chỉnh sửa</span>
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                    <Trash2Icon size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-wrap">
                  <strong>Câu hỏi:</strong> Để biết một phần tử cuộn đến trạng
                  thái sticky và thêm CSS, bạn có thể sử dụng sự kiện scroll kết
                  hợp với Intersection Observer API hoặc tính toán vị trí phần
                  tử.
                </p>

                <div className="size-20 mt-2">
                  <Image
                    src={"/avatar.jpg"}
                    alt="image quiz"
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                </div>
              </div>

              <div className="mt-2">
                <div className="flex items-center px-2 pb-2">
                  <h4 className="text-xs text-slate-400">Lựa chọn trả lời</h4>
                  <p className="flex-1 w-full h-[1px] bg-gray-100 ml-2"></p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full flex items-start gap-2">
                    <CircleCheckIcon size={16} className="text-green-500" />
                    <div className="flex-1 w-full text-sm text-ellipsis">
                      Để biết một phần tử cuộn đến trạng thái sticky và thêm
                      CSS, bạn có thể sử dụng sự kiện scroll kết hợp với
                      Intersection Observer API hoặc tính toán vị trí phần tử.
                    </div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">2023</div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">2023</div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">
                      Để biết một phần tử cuộn đến trạng thái sticky và thêm
                      CSS, bạn có thể sử dụng sự kiện scroll kết hợp với
                      Intersection Observer API hoặc tính toán vị trí phần tử.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full rounded-sm p-2 bg-white mt-4 border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="border rounded-sm p-1">
                    <Circle size={12} />
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1">
                    <RectangleHorizontalIcon size={16} />
                    <span className="text-xs">Điền vào chỗ trống</span>
                  </div>
                  <div className="border rounded-sm p-1 text-xs">30 giây</div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-gray-50 ">
                    <CopyIcon size={14} />
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500">
                    <PencilIcon size={14} />
                    <span className="text-xs">Chỉnh sửa</span>
                  </div>
                  <div className="border rounded-sm p-1 flex items-center gap-1 hover:bg-rose-50 hover:text-rose-500 cursor-pointer">
                    <Trash2Icon size={16} />
                  </div>
                </div>
              </div>

              <div className="mt-2">
                <p className="text-sm text-wrap">
                  <strong>Câu hỏi:</strong> Để biết một phần tử cuộn đến trạng
                  thái sticky và thêm CSS, bạn có thể sử dụng sự kiện scroll kết
                  hợp với Intersection Observer API hoặc tính toán vị trí phần
                  tử.
                </p>

                {/* <div className="size-20 mt-2">
                  <Image
                    src={"/avatar.jpg"}
                    alt="image quiz"
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                  />
                </div> */}
              </div>

              <div className="mt-2">
                <div className="flex items-center px-2 pb-2">
                  <h4 className="text-xs text-slate-400">Lựa chọn trả lời</h4>
                  <p className="flex-1 w-full h-[1px] bg-gray-100 ml-2"></p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="w-full flex items-start gap-2">
                    <CircleCheckIcon size={16} className="text-green-500" />
                    <div className="flex-1 w-full text-sm text-ellipsis">
                      Để biết một phần tử cuộn đến trạng thái sticky và thêm
                      CSS, bạn có thể sử dụng sự kiện scroll kết hợp với
                      Intersection Observer API hoặc tính toán vị trí phần tử.
                    </div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">2023</div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">2023</div>
                  </div>
                  <div className="w-full flex items-start gap-2">
                    <CircleXIcon size={16} className="text-rose-500" />
                    <div className="flex-1 w-full text-sm">
                      Để biết một phần tử cuộn đến trạng thái sticky và thêm
                      CSS, bạn có thể sử dụng sự kiện scroll kết hợp với
                      Intersection Observer API hoặc tính toán vị trí phần tử.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <article className="col-span-3 col-start-1  order-1 overflow-y-auto sticky top-20 flex flex-col gap-2">
            <div className="w-full border bg-white rounded-md p-2 box-shadow ">
              <div className="flex items-center gap-2">
                <Image
                  src={"/logo-gemini.svg"}
                  alt="gemini logo"
                  width={30}
                  height={30}
                  className=" object-cover"
                />

                <h4 className="text-lg font-semibold text-blue-500">
                  Gemini Ai
                </h4>
              </div>
              <p className="text-gray-500 mt-2 text-sm">
                Tạo các câu hỏi chuyên ngành cùng với AI Gemini của google
              </p>
            </div>
            <Button variant={"outline"}>
              <SparklesIcon size={20} /> Tạo câu hỏi với Gemini
            </Button>
            <div className="w-full border bg-white rounded-md box-shadow mt-2">
              <div className="flex items-center p-2 font-semibold">Nhập từ</div>
              <div className="flex items-center p-2 justify-between hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-2 text-sm">
                  <FileSpreadsheetIcon size={20} className="text-green-500" />
                  Nhập từ Excel
                </div>

                <ChevronRightIcon size={20} />
              </div>
              <div className="flex items-center p-2 justify-between hover:bg-gray-100 cursor-pointer">
                <div className="flex items-center gap-2 text-sm">
                  <FolderDownIcon size={20} className="text-green-500" />
                  Tải bản mẫu
                </div>

                <ChevronRightIcon size={20} />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default QuizIndex;
