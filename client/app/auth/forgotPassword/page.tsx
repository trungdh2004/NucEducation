"use client";
import React, { useState } from "react";
import EmailForgot from "./_emailForgot";
import OTPForgot from "./_otpForgot";
import { Button } from "@/components/ui/button";
import Logo from "@/components/root/header/Logo";
import Link from "next/link";
import ResetPassword from "./_resetPassword";

const Forgot = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");

  return (
    <div>
      <main className="w-full min-h-[590px] h-auto max-w-full pt-10">
        <div className="w-full h-full p-5 rounded-md">
          <div className="flex w-full justify-center">
            {" "}
            <Logo className="size-10" />
          </div>
          <h1 className="text-xl tracking-[-0.16px] dark:text-[#fcfdffef]  font-bold mb-1.5 mt-4 text-center ">
            Quên mật khẩu
          </h1>
          {step === 0 && <EmailForgot setEmail={setEmail} setStep={setStep} />}
          {step === 1 && <OTPForgot setStep={setStep} email={email} />}
          {step === 2 && <ResetPassword email={email} />}

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

          <Link href={"/auth/login"}>
            <Button className="w-full" type="submit" variant={"outline"}>
              Đăng nhập
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Forgot;
