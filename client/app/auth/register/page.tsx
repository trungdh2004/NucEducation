"use client";
import Logo from "@/components/root/header/Logo";
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
import apiRequest from "@/lib/fetchApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, MailCheckIcon } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Register() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setTransition] = useTransition();
  const formSchema = z
    .object({
      name: z.string().trim().min(1, {
        message: "Họ và tên phải bắt buộc",
      }),
      email: z
        .string()
        .trim()
        .email({
          message: "Email không đúng định dạng",
        })
        .min(1, {
          message: "Email phải bắt buộc",
        }),
      password: z.string().trim().min(1, {
        message: "Mật khẩu phải bắt buộc",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Nhập lại mật khẩu phải bắt buộc",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Nhập lại mật khẩu không thỏa mãn",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setTransition(async () => {
      try {
        const res = await apiRequest.post("/auth/register", values);
        console.log("data", res);
        setIsSubmitted(true);
      } catch (error: unknown) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred");
        }
      }
    });
  };

  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      {!isSubmitted ? (
        <div className="w-full h-full p-5 rounded-md">
          <div className="flex w-full justify-center">
            {" "}
            <Logo className="size-10" />
          </div>
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef]  font-bold mb-1.5 mt-4 text-center ">
            Đăng kí tài khoản Nuc Education
          </h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Họ và tên
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nuc Education "
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nuceducation@gmail.com"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Mật khẩu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-2">
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                        Nhập lại mật khẩu
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="••••••••••••"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mb-4 flex w-full items-center justify-end">
                <Link
                  className="text-sm dark:text-white"
                  href={`/forgot-password?email=${form.getValues().email}`}
                >
                  Quên mật khẩu
                </Link>
              </div>
              <Button
                className="w-full text-[15px] h-[40px] text-white font-semibold"
                disabled={isPending}
                type="submit"
              >
                {isPending && <Loader className="animate-spin" />}
                Đăng kí
                <ArrowRight />
              </Button>

              <div className="mb-6 mt-6 flex items-center justify-center">
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
                <span className="mx-4 text-xs dark:text-[#f1f7feb5] font-normal">
                  *
                </span>
                <div
                  aria-hidden="true"
                  className="h-px w-full bg-[#eee] dark:bg-[#d6ebfd30]"
                  data-orientation="horizontal"
                  role="separator"
                ></div>
              </div>
            </form>
          </Form>

          <p className="text-sm dark:text-slate- font-normal mt-7 text-center">
            Nếu bạn đã có tài khoản ?
            <Link
              className=" hover:underline ml-1 text-blue-500"
              href="/auth/login"
            >
              Đăng nhập
            </Link>{" "}
          </p>
        </div>
      ) : (
        <div>
          <div className="w-full h-[80vh] flex flex-col gap-2 items-center justify-center rounded-md">
            <div className="size-[48px]">
              <MailCheckIcon size="48px" className="animate-bounce" />
            </div>
            <h2 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold">
              Vui lòng kiểm trả email
            </h2>
            <p className="mb-2 text-center text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
              Chúng tôi đã gửi liên kết xác mình tài khoản vào email:{" "}
              {form.getValues().email}.
            </p>
            <Link href="/auth/login">
              <Button className="h-[40px]">
                Đăng nhập
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
