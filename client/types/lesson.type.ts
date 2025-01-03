import { PlayerResponse } from "./player.type";
import { IQuestionResponse } from "./question.type";

export interface LessonLiveRequest {
  name: string;
  quizId: string;
  type: "live" | "always";
  quizName: string;
}

export interface LessonResponseReview {
  _id: string;
  createBy: string;
  code: string;
  name: string;
  quizId: string;
  quizName: string;
  type: string;
  startAt: Date;
  totalQuestions: number;
  totalAnswers: number;
  totalCorrect: number;
  totalWrong: number;
  totalPlayers: number;
  inRunning: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface ILessonQuestion extends IQuestionResponse {
  lessonId: string;
  stats: {
    totalAnswer: number;
    totalCorrect: number;
    totalWrong: number;
    totalTime: number;
  };
}

export interface LessonPlayerResponse {
  lesson: LessonResponseReview;
  player: PlayerResponse;
  listQuestion: ILessonQuestion[];
  countIndex: number;
  countQuestion: number;
}
