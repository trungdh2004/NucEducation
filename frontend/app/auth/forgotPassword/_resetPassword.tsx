import { forgotPassApi } from "@/actions/auth.action";
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
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  email: string;
}

const ResetPassword = ({ email }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const formSchema = z
    .object({
      password: z.string().trim().min(1, {
        message: "Mật khẩu phải bắt buộc",
      }),
      confirmPassword: z.string().trim().min(1, {
        message: "Nhập lại mật khẩu phải bắt buộc",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Mât khẩu không trùng",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await forgotPassApi(email, values.password, values.confirmPassword);
        toast.success("Đổi mật khẩu thành công");
        router.push("/auth/login");
      } catch (error: unknown) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                  Mật khẩu mới
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••••••"
                    {...field}
                    disabled={isPending}
                    type="password"
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                  Nhập lại mật khẩu
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="••••••••••••"
                    {...field}
                    disabled={isPending}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          className="w-full text-[15px] h-[40px] text-white font-semibold"
          disabled={isPending}
          type="submit"
        >
          {isPending && <Loader className="animate-spin" />}
          Xác nhận
          <ArrowRight />
        </Button>
      </form>
    </Form>
  );
};

export default ResetPassword;
