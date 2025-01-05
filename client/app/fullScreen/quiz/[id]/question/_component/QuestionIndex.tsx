"use client";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import HeaderQuestion from "./HeaderQuestion";
import QuestionBox from "./QuestionBox";
import { uploadSingerApi } from "@/actions/upload.action";
import {
  createQuestionApi,
  getOneQuestionApi,
  updateQuestionApi,
} from "@/actions/question.action";
import { useLoadingModel } from "@/store/useLoadingModel";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import QuestionLoading from "./QuestionLoading";

const formSchema = z.object({
  query: z.object({
    text: z.string().trim().min(1, {
      message: "Chưa nhập tên ",
    }),
    image: z
      .object({
        url: z.string().trim().optional().nullable(),
        file: z.instanceof(File).optional(),
      })
      .optional(),
  }),
  time: z.number().max(60000),
  answer: z
    .number()
    .array()
    .refine((data) => data.length >= 1),
  quizId: z.string().trim().optional(),
  options: z.array(
    z.object({
      text: z.string().trim().min(1, {}),
      value: z.number().optional(),
    })
  ),
  type: z.enum(["MTQ", "SGQ", "BLANK"]),
});

export type IFormQuestion = z.infer<typeof formSchema>;

interface IProps {
  quizId: string;
  id?: string;
}

const QuestionIndex = ({ quizId, id }: IProps) => {
  const router = useRouter();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const { setOpen, setClose } = useLoadingModel();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "SGQ",
      options: [
        {
          text: "",
          value: 0,
        },
        {
          text: "",
          value: 1,
        },
        {
          text: "",
          value: 2,
        },
        {
          text: "",
          value: 3,
        },
      ],
      time: 30000,
      quizId: quizId,
      query: {
        text: "",
        image: {
          url: "https://res.cloudinary.com/dundmo7q8/image/upload/v1735463058/nuceducation/bxjmj7xnd1opg5yyl5fi.jpg",
        },
      },
    },
  });


  const handleDefault = async (id: string) => {
    try {
      const data = await getOneQuestionApi(id);
      const value = {
        query: {
          text: data.query.text,
          image: {
            url: data.query.image || "",
          },
        },
        time: data.time,
        options: data.options,
        type: data.type,
        answer: data.answer,
        quizId: data.quizId,
      };
      setImage(data.query.image || "");
      form.reset(value);
      console.log("data", data);
      setLoading(false);
    } catch (error: unknown) {
      console.error("error default question", error);

      toast.error("Lấy giá trị thất bại");
      router.push(`/fullScreen/quiz/${quizId}/edit`);
    }
  };

  useEffect(() => {
    if (id) {
      handleDefault(id);
    } else {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setOpen();
      const image = values.query.image;
      let urlImage = values.query.image?.url;

      if (image?.file) {
        const urlPath = await uploadSingerApi(image.file, 200, 200);
        urlImage = urlPath.path;
      }

      const options = values.options.map((option, index) => ({
        ...option,
        value: index,
      }));

      const data = {
        quizId,
        type: values.type,
        time: values.time,
        answer: values.answer,
        query: {
          text: values.query.text,
          image: urlImage,
        },
        options,
      };

      if (id) {
        await updateQuestionApi(id, data);
      } else {
        await createQuestionApi(data);
      }
      router.push(`/fullScreen/quiz/${quizId}/edit`);
    } catch (error) {
      console.error("error question", error);
      toast.error("Lưu thất bại");
    } finally {
      setClose();
    }
  }

  return (
    <>
      {loading ? (
        <QuestionLoading />
      ) : (
        <Form {...form}>
          <form className="w-full " onSubmit={form.handleSubmit(onSubmit)}>
            <HeaderQuestion quizId={quizId} />
            <QuestionBox image={image} setImage={setImage} />
          </form>
        </Form>
      )}
    </>
  );
};

export default QuestionIndex;
