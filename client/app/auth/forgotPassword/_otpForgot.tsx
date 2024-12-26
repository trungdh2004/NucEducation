import { verifyOtpApi } from "@/actions/auth.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader } from "lucide-react";
import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface Props {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  email: string;
}

const OTPForgot = ({  setStep, email }: Props) => {
  const [isPending, startTransition] = useTransition();

  const formSchema = z.object({
    code: z
      .string()
      .trim()
      .min(7, {
        message: "OTP chưa nhập",
      })
      .length(7),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        await verifyOtpApi(email, values.code);

        setStep(2);
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
            name="code"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="dark:text-[#f1f7feb5] text-sm">
                  Mã OTP
                </FormLabel>
                <FormControl>
                  <InputOTP maxLength={7} {...field}>
                    <InputOTPGroup className="w-full flex items-center justify-between *:border *:border-gray-200 *:rounded-md">
                      <InputOTPSlot className="size-10" index={0} />
                      <InputOTPSlot className="size-10" index={1} />
                      <InputOTPSlot className="size-10" index={2} />
                      <InputOTPSlot className="size-10" index={3} />
                      <InputOTPSlot className="size-10" index={4} />
                      <InputOTPSlot className="size-10" index={5} />
                      <InputOTPSlot className="size-10" index={6} />
                    </InputOTPGroup>
                  </InputOTP>
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

export default OTPForgot;
