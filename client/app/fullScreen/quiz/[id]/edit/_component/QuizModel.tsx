"use client";
import { uploadSingerApi } from "@/actions/upload.action";
import SelectPagingComponent from "@/components/common/SelectPagingComponent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appDifficultyQuiz } from "@/config/appQuestion";
import rankConfig from "@/config/rank.config";
import { cn } from "@/lib/utils";
import { useLoadingModel } from "@/store/useLoadingModel";
import { CateResponse } from "@/types/Category.type";
import { IQuizResponse, IUpdateQuiz } from "@/types/quizz.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface IProps {
  open: boolean;
  handleClose: () => void;
  initData: IQuizResponse;
  handleEditQuiz: (data: IUpdateQuiz) => void;
}

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Chưa điền tên bài tập",
  }),
  difficulty: z.number({ message: "Chưa chọn độ khó" }),
  level: z.number({ message: "Chưa chọn lớp" }),
  image: z.object({
    url: z.string(),
    file: z.instanceof(File).optional(),
  }),
  category: z
    .object({
      _id: z.string(),
      name: z.string(),
    })
    .refine((data) => data._id, { message: "Chưa chọn môn học" }),
});

const QuizModel = ({ open, handleClose, initData, handleEditQuiz }: IProps) => {
  const { setOpen, setClose } = useLoadingModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });
  const [image, setImage] = useState("");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setOpen();
      const image = values.image;
      let urlImage = values.image?.url;

      if (image?.file) {
        const urlPath = await uploadSingerApi(image.file, 300, 200);
        urlImage = urlPath.path;
      }

      const data: IUpdateQuiz = {
        name: values.name,
        level: values.level,
        difficulty: values.difficulty,
        category: values.category._id,
        image: urlImage,
      };

      await handleEditQuiz(data);
    } catch (error) {
      console.error("error question", error);
      toast.error("Lưu thất bại");
    } finally {
      setClose();
      handleClose();
    }
  }

  useEffect(() => {
    if (initData) {
      const difficultyObject = initData.difficulty
        ? { difficulty: initData.difficulty }
        : {};
      const levelObject = initData.level ? { level: initData.level } : {};
      const categoryObject = initData.category
        ? { category: initData.category }
        : {};

      const data = {
        name: initData.name || "",
        image: {
          url: initData.image,
        },
        ...difficultyObject,
        ...levelObject,
        ...categoryObject,
      };
      form.reset(data);
      setImage(initData.image);
    }
  }, [initData]);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[90%] rounded-md max-w-[600px] p-2 gap-0">
        <DialogHeader className="border-b pb-1 space-y-0 text-start">
          <h4 className="text-base font-semibold">Cài đặt bài tập</h4>
        </DialogHeader>

        <div className="py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ảnh bìa</FormLabel>
                    <FormControl>
                      <div className="w-full bg-white border rounded-sm">
                        <label
                          htmlFor="file-upload"
                          className={cn("w-full relative ")}
                        >
                          <div className="relative w-full bg-white ">
                            <div
                              className={cn(
                                "w-full h-[160px] flex justify-center items-center flex-col",
                                image && "hidden"
                              )}
                            >
                              <UploadIcon size={50} strokeWidth={1} />
                              <h3 className="mt-2 text-sm font-medium text-gray-900">
                                <span>Chọn ảnh</span>
                              </h3>
                              <p className="mt-1 text-xs text-gray-500">
                                PNG, JPG, GIF.
                              </p>
                            </div>

                            <div
                              className={cn(
                                " relative flex justify-center items-center h-[160px]",
                                image ? "" : "hidden"
                              )}
                            >
                              <Image
                                src={image}
                                className={cn(
                                  "aspect-[3/2] h-[140px] object-cover border border-slate-100"
                                )}
                                id="preview"
                                width={150}
                                height={150}
                                alt=""
                              />
                            </div>
                          </div>
                        </label>

                        <input
                          type="file"
                          name=""
                          id="file-upload"
                          accept="image/jpeg, image/png,image/svg,image/jpg,image/webp"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => {
                            const url = URL.createObjectURL(
                              (event?.target as HTMLInputElement)
                                ?.files?.[0] as File
                            );
                            field.onChange({
                              url,
                              file: event?.target?.files?.[0],
                            });
                            setImage(url);
                          }}
                          hidden
                          className="hidden outline-none focus-visible:ring-0 "
                        />
                      </div>
                    </FormControl>

                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-1 col-span-1 sm:col-span-2">
                      <FormLabel>Tên bài tập</FormLabel>
                      <FormControl className="mt-0 relative">
                        <div className="relative">
                          <Input
                            placeholder="Nuc Education ...."
                            {...field}
                            className="mt-0 pr-10"
                            maxLength={64}
                          />
                          <div className="absolute top-1/2 -translate-y-1/2 right-0 text-[10px] w-8">
                            {field.value.length}/64
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="space-y-1 col-span-1">
                      <FormLabel>Độ khó</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(+value);
                          }}
                          defaultValue={`${field.value}`}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="- Chọn -" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {appDifficultyQuiz.map((difficulty) => (
                              <SelectItem
                                value={`${difficulty.value}`}
                                key={difficulty.value}
                              >
                                {difficulty.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Môn học</FormLabel>
                      <FormControl>
                        <SelectPagingComponent<CateResponse>
                          value={field.value as CateResponse}
                          getOptionLabel={(option) => option.name}
                          getOptionValue={(option) => option._id}
                          onChange={field.onChange}
                          url="/category/paging"
                          searchObject={{
                            pageSize: 10,
                          }}
                          placeholder="Môn học "
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel>Lớp</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(+value);
                          }}
                          defaultValue={`${field.value}`}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="- Chọn -" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-80">
                            {rankConfig.map((rank) => (
                              <SelectItem
                                value={`${rank.value}`}
                                key={rank.value}
                              >
                                {rank.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full flex justify-end">
                <Button type="submit">Lưu</Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuizModel;
