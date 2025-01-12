"use client";
import { createPlayerApi } from "@/actions/player.action";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().trim().min(1).max(36),
});

const JoinLessonIndex = ({ lessonId }: { lessonId: string }) => {
  const router = useRouter();
  const { user } = useAuthContext();
  const [isPending, setTransition] = useTransition();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setTransition(async () => {
      try {
        const data = await createPlayerApi({
          name: values.name,
          userId: user?._id,
          lessonId: lessonId,
        });
        router.push(`/fullScreen/lesson/${data.lessonId}/running/${data._id}`);
        console.log("data", data);
      } catch (error: unknown) {
        console.log("error", error);
        const err = error as Error;
        toast.error(err.message);
        router.push(`/`);
      }
    });
  }

  return (
    <div className="w-full space-y-4">
      <p className="bg-transparent text-gray-400">Tên người tham gia</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className=" bg-white h-12 md:text-lg text-black placeholder:text-gray-500"
                    placeholder="NucEducation"
                    maxLength={36}
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full h-12 md:text-lg font-semibold"
            disabled={isPending}
          >
            {isPending && <LoaderIcon size={20} className="animate-spin" />}
            Tham gia
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default JoinLessonIndex;
