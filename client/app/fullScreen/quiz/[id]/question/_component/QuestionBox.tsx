import TooltipComponent from "@/components/common/TooltipComponent";
import { FormControl, FormField, FormItem } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ImagePlusIcon } from "lucide-react";
import Image from "next/image";
import React, { Dispatch, SetStateAction } from "react";
import { useFormContext } from "react-hook-form";
import QuestionBlank from "./QuestionBlank";
import QuestionMSQ from "./QuestionMSQ";

interface IProps {
  image: string;
  setImage: Dispatch<SetStateAction<string>>;
}

const QuestionBox = ({ image, setImage }: IProps) => {
  const form = useFormContext();
  return (
    <section className="w-full h-screen pt-20 pb-8">
      <div className=" max-w-5xl mx-auto bg-[#0F67B1] border rounded-md h-full max-h-[calc(100vh-120px)] p-4">
        <div className="h-full w-full flex flex-col">
          <div className="rounded-lg h-56 text-light-3 relative flex flex-col border-light-20% w-full border p-2">
            <div className="flex w-full">
              <FormField
                control={form.control}
                name="query.image"
                render={({ field }) => (
                  <label htmlFor="file-upload">
                    <TooltipComponent label="Thêm hình ảnh">
                      <div className="p-1 border rounded-sm text-white bg-gray-50/30 cursor-pointer">
                        <ImagePlusIcon size={12} />
                      </div>
                    </TooltipComponent>
                    <input
                      type="file"
                      name=""
                      id="file-upload"
                      accept="image/jpeg, image/png,image/svg,image/jpg,image/webp"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        const files = event.target.files;

                        if (!files) {
                          return;
                        }
                        const file = files[0];

                        if (!file) {
                          return;
                        }

                        const url = URL.createObjectURL(file);
                        setImage(url);
                        field.onChange({
                          url: url,
                          file,
                        });
                      }}
                      hidden
                      className="hidden outline-none focus-visible:ring-0 "
                    />
                  </label>
                )}
              />
            </div>
            <div className="flex-1 mt-2 flex items-center gap-2">
              <div
                className={cn(
                  "h-full aspect-square border rounded-md overflow-hidden hidden p-1  items-center justify-center relative",
                  image && "flex"
                )}
              >
                <Image
                  src={image}
                  alt="image question"
                  width={160}
                  height={160}
                  className="aspect-square h-full object-cover rounded-sm"
                />
                <div className="absolute top-1 right-1 size-8 border rounded-sm"></div>
              </div>
              <FormField
                control={form.control}
                name="query.text"
                render={({ field }) => (
                  <FormItem className="flex-1 h-full">
                    <FormControl>
                      <Textarea
                        className="flex justify-content items-center w-full h-full text-center resize-none leading-4 border-none text-white font-semibold md:text-2xl placeholder:text-gray-200 focus:bg-gray-700/20 placeholder:font-medium"
                        placeholder="Nhập câu hỏi tại đây !!!"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {form.watch("type") === "BLANK" ? <QuestionBlank /> : <QuestionMSQ />}
        </div>
      </div>
    </section>
  );
};

export default QuestionBox;
