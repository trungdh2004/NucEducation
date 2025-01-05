"use client";
import { lessonPlayerApi } from "@/actions/lesson.action";
import { finishPlayerApi, proceedPlayerApi } from "@/actions/player.action";
import { cn } from "@/lib/utils";
import { ILessonQuestion, LessonResponseReview } from "@/types/lesson.type";
import { TypeQuestion } from "@/types/question.type";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import BoxLessonPlayer from "./BoxLessonPlayer";
import HeaderLessonPlayer from "./HeaderLessonPlayer";

const LessonPlayerIndex = ({
  id,
  playerId,
}: {
  id: string;
  playerId: string;
}) => {
  const router = useRouter();
  const [isPending, setTransition] = useTransition();
  const [lesson, setLesson] = useState<LessonResponseReview | null>();
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<ILessonQuestion | null>();
  const [listQuestion, setListQuestion] = useState<ILessonQuestion[]>([]);
  const [playIndex, setPlayIndex] = useState<number>(0);
  const [answer, setAnswer] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<(number | string)[]>([]);
  const [status, setStatus] = useState<"none" | "completed" | "wrong">("none");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const data = await lessonPlayerApi(id, playerId);
        setTotalQuestion(data.countQuestion);
        setQuestionIndex(data.countIndex);
        setLesson(data.lesson);
        setListQuestion(data.listQuestion);
        // setPlayer(data.player);
        setQuestion(data.listQuestion[0]);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        router.push("/");
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, playerId]);

  const handleAnswer = async (type: TypeQuestion, value: number | string) => {
    if (type === "SGQ") {
      setAnswer([value]);
      setTransition(async () => {
        try {
          const res = await proceedPlayerApi({
            lessonId: id,
            playerId: playerId,
            questionId: question?._id as string,
            response: [value],
          });
          setResponse(res.answer);
          setStatus(res.isCorrect ? "completed" : "wrong");

          setTimeout(handleNextQuestion, 4000);
        } catch (error: unknown) {
          console.log("error", error);
          toast.error("Có lỗi xảy ra");
        }
      });
    } else if (type === "MTQ") {
      const check = answer.includes(value);
      if (check) {
        setAnswer((prev) => {
          const arrNew = prev.filter((item) => item !== value);
          return arrNew;
        });
      } else {
        setAnswer((prev) => [...prev, value]);
      }
    }
  };

  const handleResponse = async (type: TypeQuestion, value: string) => {
    if (type === "MTQ") {
      setTransition(async () => {
        try {
          const res = await proceedPlayerApi({
            lessonId: id,
            playerId: playerId,
            questionId: question?._id as string,
            response: answer,
          });
          setResponse(res.answer);
          setStatus(res.isCorrect ? "completed" : "wrong");

          setTimeout(handleNextQuestion, 4000);
        } catch (error: unknown) {
          console.log("error", error);
          toast.error("Có lỗi xảy ra");
        }
      });
    } else if (type === "BLANK") {
      setTransition(async () => {
        try {
          const res = await proceedPlayerApi({
            lessonId: id,
            playerId: playerId,
            questionId: question?._id as string,
            response: [value],
          });
          setResponse(res.answer);
          setStatus(res.isCorrect ? "completed" : "wrong");
          setTimeout(handleNextQuestion, 4000);
        } catch (error: unknown) {
          console.log("error", error);
          toast.error("Có lỗi xảy ra");
        }
      });
    }
  };

  const handleFinishPlayer = async () => {
    try {
      setLoading(true);
      await finishPlayerApi(playerId);
      router.push(`/fullScreen/lesson/${id}/finish/${playerId}`);
    } catch (error: unknown) {
      console.log("error", error);
    }
  };

  const handleNextQuestion = async () => {
    if (questionIndex + 1 >= totalQuestion) {
      await handleFinishPlayer();
      return;
    }
    setStatus("none");
    setResponse([]);
    setQuestionIndex((prev) => ++prev);
    setPlayIndex((prev) => ++prev);
    setAnswer([]);
    const nextIndex = playIndex + 1;
    setQuestion(listQuestion[nextIndex]);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center animate-pulse px-2">
          <div className="fixed top-0 h-16 left-0 bg-gray-600/50 w-full"></div>
          <div className="w-full h-[calc(100vh-136px)] mt-16 p-4">
            <div className="w-full h-full flex flex-col gap-2">
              <div className="h-1/2 w-full flex flex-col">
                <div className="w-full relative flex items-center justify-center py-3 h-full transition-all duration-300 ">
                  <div className="max-sm:w-full min-w-[60%] filter backdrop-blur-md border border-gray-600 relative sm:h-min h-fit rounded-md py-4 bg-gray-600/50">
                    <div className="h-20"></div>
                  </div>
                </div>
              </div>
              <div className="h-1/2 w-full flex flex-col">
                <div className="flex gap-2 h-full">
                  <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
                  <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
                  <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
                  <div className="h-full w-1/4 bg-gray-600/50 rounded-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full">
          <HeaderLessonPlayer
            lesson={(lesson as LessonResponseReview) || {}}
            totalQuestion={totalQuestion}
            questionIndex={questionIndex}
            handleFinishPlayer={handleFinishPlayer}
          />

          <BoxLessonPlayer
            totalQuestion={totalQuestion}
            questionIndex={questionIndex}
            question={question as ILessonQuestion}
            answer={answer}
            handleAnswer={handleAnswer}
            handleResponse={handleResponse}
            handleNextQuestion={handleNextQuestion}
            response={response}
            status={status}
            isPending={isPending}
          />

          <div
            className={cn(
              "h-16 opacity-100 translate-y-16 w-full duration-500 fixed bottom-0 left-0 ",
              status !== "none" && "opacity-100 translate-y-0"
            )}
          >
            <div
              className={cn(
                "flex items-center justify-center h-full text-white text-2xl font-bold",
                status === "completed" && "bg-green-500",
                status === "wrong" && "bg-red-500"
              )}
            >
              {status === "completed" ? "Đúng" : "Sai"}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LessonPlayerIndex;
