"use client";
import { verifyEmailApi } from "@/actions/auth.action";
import Logo from "@/components/root/header/Logo";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function VerifyEmailComponent() {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const params = useSearchParams();
  const code = params.get("code");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTransition(async () => {
      try {
        if (!code) {
          toast.error("Link xác nhận đã bị thay đổi");
          return;
        }
        await verifyEmailApi(code);
        router.push("/auth/login");
      } catch (error: unknown) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  };

  return (
    <main className="w-full min-h-[590px] h-full max-w-full flex items-center justify-center ">
      <div className="w-full h-full p-5 rounded-md">
        <Logo className="size-10" />

        <h1
          className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef] font-bold mb-4 mt-8
        text-center sm:text-left"
        >
          Xác nhận tài khoản
        </h1>
        <p className="mb-6 text-center sm:text-left text-[15px] dark:text-[#f1f7feb5] font-normal">
          Để xác nhận tài khoản của bạn, vui lòng làm theo nút bên dưới.
        </p>
        <form onSubmit={handleSubmit}>
          <Button
            disabled={isPending}
            type="submit"
            className="w-full text-[15px] h-[40px] text-white font-semibold"
          >
            {isPending && <Loader className="animate-spin" />}
            Xác nhận
          </Button>
        </form>

        <p className="mt-6 text-sm text-muted-foreground dark:text-[#f1f7feb5] font-normal">
          Nếu bạn có bất kỳ vấn đề nào khi xác nhận tài khoản của mình, vui lòng
          liên hệ{" "}
          <a
            className="outline-none transition duration-150 ease-in-out 
            focus-visible:ring-2 text-primary hover:underline focus-visible:ring-primary"
            href="#"
          >
            nuceducation@gmail.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
