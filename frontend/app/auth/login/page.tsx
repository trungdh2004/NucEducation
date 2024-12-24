"use client";
import { loginApi, sendMailVerify } from "@/actions/auth.action";
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
import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader, MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { setIsLogin, setUser } = useAuthContext();
  const formSchema = z.object({
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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const res = await loginApi(values);
        setUser(res.user);
        setIsLogin(true);
        router.push("/");
      } catch (error: unknown) {
        console.log("error", error);
        const err = error as Error;
        toast.error(err.message);
      }
    });
  };

  const handleSendEmail = async () => {
    try {
      const email = form.getValues("email");

      if (!email) {
        form.setError("email", {
          message: "Vui lòng nhập email",
        });
        return;
      } else {
        form.clearErrors("email");
      }

      const res = await sendMailVerify(email);

      toast.success(res.message);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  return (
    <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
      <div className="w-full h-full p-5 rounded-md">
        <div className="flex w-full justify-center">
          {" "}
          <Logo className="size-10" />
        </div>
        <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef]  font-bold mb-1.5 mt-4 text-center ">
          Đăng nhập vào Nuc Education
        </h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="mb-4">
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
            <div className="mb-4">
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
            <div className="mb-4 flex w-full items-center justify-end">
              <Link
                className="text-sm dark:text-white"
                href={`/auth/forgotPassword`}
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
              Đăng nhập
              <ArrowRight />
            </Button>

            <div className="mb-4 mt-4 flex items-center justify-center">
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
        <Button
          className="w-full"
          disabled={isPending}
          type="submit"
          variant={"outline"}
          onClick={handleSendEmail}
        >
          {isPending && <Loader className="animate-spin" />}
          Xác nhận Email
          <MailCheck />
        </Button>
        <p className="text-sm dark:text-slate- font-normal mt-7 text-center">
          Nếu bạn chưa có tài khoản ?
          <Link
            className=" hover:underline ml-1 text-blue-500"
            href="/auth/register"
          >
            Đăng kí
          </Link>{" "}
        </p>
      </div>
    </main>
  );
}
