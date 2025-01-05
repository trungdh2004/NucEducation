"use client";
import { getByIdQuizPrivateApi, updateQuizApi } from "@/actions/quiz.action";
import { IQuestionAi, IQuestionResponse } from "@/types/question.type";
import { IQuizResponse, IUpdateQuiz } from "@/types/quizz.type";
import { useEffect, useState } from "react";
import HeaderQuiz from "./HeaderQuiz";
import QuizBox from "./QuizBox";
import QuizLoading from "./QuizLoading";
import {
  createManyQuestionApi,
  deleteQuestionApi,
} from "@/actions/question.action";
import { toast } from "sonner";
import QuizArticle from "./QuizArticle";
import { useLoadingModel } from "@/store/useLoadingModel";

const QuizIndex = ({ id }: { id: string }) => {
  const { setOpen, setClose } = useLoadingModel();
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState<IQuizResponse | object>({});
  const [questions, setQuestions] = useState<IQuestionResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await getByIdQuizPrivateApi(id);
        setQuiz(res.quiz);
        setQuestions(res.questions);
        setLoading(false);
      } catch (error: unknown) {
        const err = error as Error;
        console.log("err", err);
      }
    })();
  }, [id]);

  const handleDeleteQuestion = async (id: string) => {
    try {
      await deleteQuestionApi(id);

      setQuestions((prev) => {
        const newData = prev.filter((ques) => ques._id !== id);
        return newData;
      });

      toast.success("Đã xóa câu hỏi");
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleEditQuiz = async (data: IUpdateQuiz) => {
    try {
      const res = await updateQuizApi(id, data);
      setQuiz(res.data);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    }
  };

  const handleCreateMany = async (value: IQuestionAi[]) => {
    setOpen();
    try {
      const dataQues = value.map((question) => {
        return {
          query: question.query,
          type: question.type,
          answer: question.answer,
          options: question.options,
          aiGenerated: true,
        };
      });
      const data = await createManyQuestionApi(id, dataQues);

      console.log("data", data);

      setQuestions((prev) => {
        const newData = [...prev, ...data];
        return newData;
      });
    } catch (error: unknown) {
      console.log("error", error);
    } finally {
      setClose();
    }
  };

  return (
    <>
      {loading ? (
        <QuizLoading />
      ) : (
        <div className="w-full bg-main min-h-screen">
          <HeaderQuiz
            quiz={quiz as IQuizResponse}
            handleEditQuiz={handleEditQuiz}
          />
          <div className="py-16 block px-2 sm:px-4 md:grid lg:px-0 grid-cols-12">
            <div className="block md:col-span-12 lg:col-span-10 lg:col-start-2 md:grid gap-4 relative items-start mt-4 grid-cols-12">
              <QuizBox
                questions={questions}
                id={id}
                handleDeleteQuestion={handleDeleteQuestion}
              />
              <QuizArticle handleCreateMany={handleCreateMany} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizIndex;
