import {
  createCateApi,
  getByIdCateApi,
  updateCateApi,
} from "@/actions/category.action";
import { uploadSingerApi } from "@/actions/upload.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useLoadingModel } from "@/store/useLoadingModel";
import { CateForm } from "@/types/Category.type";

import { zodResolver } from "@hookform/resolvers/zod";
import { UploadIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface FormDialog {
  open: boolean | string;
  labelConfirm?: string;
  handleClose: () => void;
  handlePaging: () => void;
}

const formSchema = z.object({
  name: z
    .string({
      message: "Tên không được để trống",
    })
    .min(1, {
      message: "Tên không được để trống",
    }),
  thumbnail: z
    .object({
      url: z.string().optional(),
      file: z.instanceof(File).optional(),
    })
    .refine(
      (data) => {
        return !!data.url;
      },
      { message: "Nhập ảnh khác" }
    ),
  description: z
    .string({
      message: "Mô tả không được để trống",
    })
    .min(1, {
      message: "Mô tả không được để trống",
    }),
});

type StateImage = {
  file: File | undefined;
  url: string;
};
const CategoryForm = ({ open, handleClose, handlePaging }: FormDialog) => {
  const { setOpen, setClose } = useLoadingModel();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      thumbnail: { url: "" },
      description: "",
    },
  });
  const [isPending] = useState(false);
  const [image, setImage] = useState<StateImage>({
    url: "",
    file: undefined,
  });
  const handleUploadFile = async (file: File) => {
    try {
      const data = await uploadSingerApi(file, 140, 140);
      console.log("data", data);

      URL.revokeObjectURL(image.url);
      setImage({
        url: data.path,
        file,
      });
      return data.path;
    } catch (error) {
      console.error(error);
      setClose();
    } finally {
    }
  };

  const close = () => {
    form.reset();
    setImage({
      url: "",
      file: undefined,
    });
    handleClose();
  };

  const onHandleUpdate = async (dataForm: CateForm) => {
    try {
      await updateCateApi(open as string, dataForm);
      handlePaging();
      toast.success("Bạn cập nhật danh mục thành công");
      close();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setClose();
    }
  };
  const onHandleAdd = async (dataForm: CateForm) => {
    try {
      await createCateApi(dataForm);
      handlePaging();
      toast.success("Bạn thêm danh mục thành công");
      close();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setClose();
    }
  };

  useEffect(() => {
    if (typeof open === "string") {
      (async () => {
        try {
          const { data } = await getByIdCateApi(open);
          const dataReset = {
            ...data,
            thumbnail: { url: data.image },
          };
          setImage({ url: data.image, file: undefined });
          form.reset(dataReset);
        } catch (error) {
          console.error("Error:", error);
          toast.error("Lấy giá trị lỗi");
        }
      })();
    }
  }, [open]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setOpen();
    let url = data.thumbnail.url;
    if (data?.thumbnail?.file) {
      url = await handleUploadFile(data?.thumbnail?.file as File);
    }
    const dataPush = {
      name: data.name,
      description: data.description,
      image: url as string,
    };
    if (typeof open === "string") {
      onHandleUpdate(dataPush);
    } else {
      onHandleAdd(dataPush);
    }
  };

  return (
    <Dialog open={!!open} onOpenChange={close}>
      <DialogContent className="w-[90%] sm:max-w-[660px] rounded-md max-h-[90vh] p-2 sm:p-4 overflow-y-auto ">
        <DialogHeader>
          <DialogTitle>
            {typeof open === "string" ? "Cập nhật" : "Thêm danh mục"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên môn học</FormLabel>
                  <FormControl>
                    <Input placeholder="Tên" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isPending}
              control={form.control}
              name="thumbnail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ảnh môn học</FormLabel>
                  <FormControl>
                    <div className="w-full ">
                      <label
                        htmlFor="file-upload"
                        className={cn("w-full relative ")}
                      >
                        <div className="relative w-full bg-white border rounded-sm">
                          <div
                            className={cn(
                              "w-full h-[160px] flex justify-center items-center flex-col",
                              image?.url && "hidden"
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
                              image.url ? "" : "hidden"
                            )}
                          >
                            <Image
                              src={image?.url || ""}
                              alt="categoryImage"
                              className={cn(
                                "size-[140px] object-cover border-slate-100 border border-dashed"
                              )}
                              id="preview"
                              width={140}
                              height={140}
                            />
                          </div>
                        </div>
                      </label>
                      <input
                        type="file"
                        name=""
                        id="file-upload"
                        accept="image/jpeg, image/png,image/svg,image/jpg,image/webp"
                        onChange={(event) => {
                          const file = (event?.target as HTMLInputElement)
                            ?.files?.[0] as File;
                          const url = URL.createObjectURL(file);
                          setImage({
                            url: url,
                            file: file,
                          });
                          field.onChange({ url, file });
                          form.clearErrors("thumbnail");
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
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Mô tả" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">
              {typeof open === "string" ? "Cập nhật" : "Thêm môn học"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryForm;
