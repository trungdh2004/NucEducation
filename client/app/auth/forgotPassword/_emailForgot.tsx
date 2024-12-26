import { sendMailOtp } from "@/actions/auth.action";
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
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
}

const EmailForgot = ({ setEmail, setStep }: Props) => {
  const [isPending, startTransition] = useTransition();

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
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await sendMailOtp(values.email);

        setStep(1);
        setEmail(values.email);
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

export default EmailForgot;
