"use client";
import { changePassApi } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Loader } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(6, {
      message: "Mật khẩu phải 6 kí tự",
    }),
    confirmPassword: z.string().min(6, {
      message: "Nhập lại mật khẩu phải 6 kí tự",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu không trùng nhau",
  });

const PasswordSetting = () => {
  const [isPending, setTransition] = useTransition();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      try {
        await changePassApi(values.password);
        toast.success("Đổi mật khẩu tài khoản thành công");
      } catch (error: unknown) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  }
  return (
    <div className="w-full max-w-xl bg-white mx-auto border-b-4 border-blue-500 rounded-md p-6 mt-4">
      <div className="pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 flex items-center gap-2 text-gray-600 border-gray-400">
        <CircleUserRound size={20} />
        <span>Mật khẩu</span>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu mới (trên 6 kí tự)</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader size={20} className="animate-spin" />}
              Lưu thay đổi
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PasswordSetting;
