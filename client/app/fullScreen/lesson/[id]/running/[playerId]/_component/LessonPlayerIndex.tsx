"use client";
import React, { useEffect, useState, useTransition } from "react";
import FooterLessonPlayer from "./FooterLessonPlayer";
import HeaderLessonPlayer from "./HeaderLessonPlayer";
import BoxLessonPlayer from "./BoxLessonPlayer";
import { lessonPlayerApi } from "@/actions/lesson.action";
import { useRouter } from "next/navigation";
import { ILessonQuestion, LessonResponseReview } from "@/types/lesson.type";
import { PlayerResponse } from "@/types/player.type";
import { TypeQuestion } from "@/types/question.type";

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
  const [player, setPlayer] = useState<PlayerResponse | null>();
  const [listQuestion, setListQuestion] = useState<ILessonQuestion[]>([]);
  const [playIndex, setPlayIndex] = useState<number>(0);
  const [time, setTime] = useState(30000);
  const [answer, setAnswer] = useState<(string | number)[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await lessonPlayerApi(id, playerId);
        setTotalQuestion(data.countQuestion);
        setQuestionIndex(data.countIndex);
        setLesson(data.lesson);
        setListQuestion(data.listQuestion);
        setPlayer(data.player);
        setQuestion(data.listQuestion[0]);
      } catch (error) {
        console.log("error", error);
        // router.push("/");
      }
    })();
  }, [id, playerId]);

  const handleAnswer = async (type: TypeQuestion, value: number | string) => {
    if (type === "SGQ") {
      try {
        setAnswer([value]);
        handleNextQuestion();
      } catch (error) {}
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

  const handleBlank = async (text:string) => {
    
  }

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => ++prev);
    setPlayIndex((prev) => ++prev);
    setAnswer([]);
    const nextIndex = playIndex + 1;
    setQuestion(listQuestion[nextIndex]);
  };

  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className="relative w-full">
          <HeaderLessonPlayer lesson={(lesson as LessonResponseReview) || {}} />

          <BoxLessonPlayer
            totalQuestion={totalQuestion}
            questionIndex={questionIndex}
            question={question as ILessonQuestion}
            answer={answer}
            handleAnswer={handleAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      )}
    </>
  );
};

export default LessonPlayerIndex;
