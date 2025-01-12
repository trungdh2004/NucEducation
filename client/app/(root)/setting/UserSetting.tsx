"use client";
import { changeNameApi } from "@/actions/auth.action";
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
import { CircleUserRound, Loader } from "lucide-react";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const UserSetting = () => {
  const { user, setUser } = useAuthContext();
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.name || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.setValue("username", user.name);
    }
  }, [user]);

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      try {
        await changeNameApi(values.username);
        setUser((prev) => {
          if (prev) {
            return {
              ...prev,
              name: values.username,
            };
          }
          return undefined;
        });

        toast.success("Đổi tên tài khoản thành công");
      } catch (error: unknown) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  }
  return (
    <div className="w-full max-w-xl bg-white mx-auto border-t-4 border-blue-500 rounded-md p-6">
      <div className="text-xl font-semibold text-gray-600 ">Cài đặt</div>
      <div className="pb-3 mt-8 mb-6 text-base font-semibold border-b h-9 flex items-center gap-2 border-gray-400">
        <CircleUserRound size={20} />
        <span>Tài khoản</span>
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <FormLabel>Email</FormLabel>
              <Input readOnly value={user?.email} />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên tài khoản</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="shadcn"
                      {...field}
                      disabled={isPending}
                    />
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

export default UserSetting;
