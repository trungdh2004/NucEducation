"use client";
import React, { useEffect, useState } from "react";
import LessonItem from "./LessonItem";
import { listQuizHotApi } from "@/actions/quiz.action";
import { IQuizResponse } from "@/types/quizz.type";
import Link from "next/link";

const LessonList = () => {
  const [quizs, setQuizs] = useState<IQuizResponse[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await listQuizHotApi();
        setQuizs(data);
      } catch (error: unknown) {
        console.log("Failed to", error);
      }
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {quizs.map((quiz) => (
          <LessonItem key={quiz._id} quiz={quiz} />
        ))}
      </div>

      <div className="w-full flex items-center justify-center py-4 text-sm text-gray-500">
        <Link href={`/diversity`}>
          <span className="hover:underline cursor-pointer">Xem tất cả</span>
        </Link>
      </div>
    </div>
  );
};

export default LessonList;
