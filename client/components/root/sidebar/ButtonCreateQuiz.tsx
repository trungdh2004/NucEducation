"use client";
import { createQuizApi } from "@/actions/quiz.action";
import { Button } from "@/components/ui/button";
import { Loader, PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import { toast } from "sonner";

const ButtonCreateQuiz = () => {
  const [pending, setTransition] = useTransition();
  const router = useRouter();

  const handleCreate = () => {
    setTransition(async () => {
      try {
        const { data } = await createQuizApi("Bài tập chưa có tiêu đề");
        router.push(`/fullScreen/quiz/${data._id}/edit`);
        console.log("data", data);
      } catch (error: unknown) {
        const err = error as Error;
        toast.error(err.message);
      }
    });
  };

  return (
    <Button className="w-full" onClick={handleCreate} disabled={pending}>
      {pending ? (
        <Loader size={20} className="animate-spin" />
      ) : (
        <PlusIcon size={20} />
      )}
      Tạo câu hỏi
    </Button>
  );
};

export default ButtonCreateQuiz;
