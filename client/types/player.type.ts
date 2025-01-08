import { ILessonQuestion } from "./lesson.type";

export interface PlayerCreate {
  name: string;
  userId?: string;
  lessonId: string;
}

export interface PlayerResponse {
  _id: string;
  name: string;
  userId: string;
  startPlay: Date;
  endPlay?: Date;
  lessonId: string;
  totalCorrect: number;
  totalWrong: number;
  totalQuestionAnswer: number;
  isRunning: boolean;
  question: string[];
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface PlayerProceed {
  lessonId: string;
  playerId: string;
  questionId: string;
  response: (number | string)[];
}

export interface IPlayerDetails {
  player: PlayerResponse;
  response: IPlayerResponse[];
}

export interface IPlayerResponse {
  question: ILessonQuestion;
  query: {
    text: string;
    image: string;
  };
  answer: { text: string; value: number; _id: string }[];
  response: string[];
  isCorrect: boolean;
}
