import Logo from "@/components/root/header/Logo";
import Link from "next/link";
import React from "react";
import JoinLessonIndex from "./_component/JoinLessonIndex";

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div className=" w-full">
      <div className="fixed inset-0 min-h-screen bg-no-repeat bg-cover bg-center bg-[url(/summer_theme_bg1.png)] z-[-1]"></div>

      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="p-4 sm:p-6 rounded-md border-b-4 border-r-4 border-slate-600 bg-black/60 w-[320px] sm:w-[480px] max-w-[480px] text-white space-y-4">
          <div className="flex justify-center">
            <Link href={"/"} className="cursor-pointer">
              <Logo className="size-14" />
            </Link>
          </div>
          <JoinLessonIndex lessonId={params.id} />
        </div>
      </div>
    </div>
  );
};

export default page;
