"use client";
import {
  deleteQuizApi,
  getByIdQuizApi,
  lovedQuizApi,
} from "@/actions/quiz.action";
import { IQuestionResponse } from "@/types/question.type";
import { IQuizResponse } from "@/types/quizz.type";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import QuizDetailHeader from "./QuizDetailHeader";
import QuizItem from "./QuizItem";
import { toast } from "sonner";

const QuizIndexDetail = ({ id }: { id: string }) => {
  const [quiz, setQuiz] = useState<IQuizResponse | object>({});
  const [questions, setQuestions] = useState<IQuestionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleDetail = async (id: string) => {
    try {
      setLoading(true);
      // await new Promise((resolve, reject) => {
      //   setTimeout(resolve, 5000);
      // });
      const data = await getByIdQuizApi(id);
      setQuiz(data.quiz);
      setQuestions(data.questions);
    } catch (error) {
      console.log("error", error);
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteQuizApi(id);
      router.push("/library");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleLoved = async (isLoved: boolean) => {
    try {
      const data = await lovedQuizApi(id, isLoved);
      setQuiz((prev) => {
        return {
          ...prev,
          isLoved: isLoved,
        };
      });
      toast.success(isLoved ? "Đã thêm vào yêu thích" : "Đã bỏ yêu thích");
    } catch (error) {
      toast.error("Cập nhập thất bại");
    }
  };

  useEffect(() => {
    handleDetail(id);
  }, [id]);

  return (
    <>
      <div className="w-full py-4">
        <div className=" max-w-5xl  mx-auto">
          {loading ? (
            <div>
              <div className="w-full bg-gray-100 animate-pulse rounded-md p-6">
                <div className="flex  items-center justify-start gap-3 flex-nowrap mb-4">
                  <div className="size-20 rounded-md overflow-hidden bg-gray-200"></div>

                  <div className="flex justify-start items-stretch flex-col flex-nowrap gap-2">
                    <div className="w-40 sm:w-60 bg-gray-200 h-8 rounded-md"></div>
                    <div className="w-28 sm:w-40 bg-gray-200 h-8 rounded-md"></div>
                  </div>
                </div>
              </div>
              <div className="w-full grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-3 hidden sm:block">
                  <div className="h-32 w-full rounded-md bg-gray-100 "></div>
                </div>
                <div className="col-span-12 sm:col-span-9  flex flex-col gap-3">
                  <div className="h-32 w-full rounded-md bg-gray-100 "></div>
                  <div className="h-32 w-full rounded-md bg-gray-100 "></div>
                  <div className="h-32 w-full rounded-md bg-gray-100 "></div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <QuizDetailHeader
                quiz={quiz as IQuizResponse}
                handleDelete={handleDelete}
                handleLoved={handleLoved}
              />

              <div className="w-full grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-3 hidden sm:block ">
                  <div className="w-full p-2 flex flex-col bg-white rounded-md border">
                    <h4 className="border-b pb-2">Thông tin bài tập</h4>

                    <div className="py-2 flex flex-col gap-1 text-sm">
                      <p>
                        Số bài học được tạo:{" "}
                        {(quiz as IQuizResponse)?.stats?.lesson || 0}{" "}
                      </p>
                      <p>
                        Số lượt chơi:{" "}
                        {(quiz as IQuizResponse)?.stats?.totalPlayers || 0}{" "}
                      </p>
                      <p>Số câu hỏi: {questions.length || 0} </p>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-9  flex flex-col gap-3">
                  {questions?.map((question, index) => (
                    <QuizItem key={index} data={question} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuizIndexDetail;
