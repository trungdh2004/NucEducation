import { CateResponse } from "./Category.type";

export interface ICategory {
  _id: string;
  name: string;
  image: string;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  totalQuiz: number;
  description: string;
}

export interface IQuizResponse {
  stats: Stats;
  _id: string;
  name: string;
  deleted: boolean;
  isLoved: boolean;
  createBy: CreateBy;
  lifetimeAccess: boolean;
  image: string;
  questions: unknown[];
  isPublic: boolean;
  difficulty: number;
  createdAt: Date;
  updatedAt: Date;
  level: number;
  __v: number;
  category: CateResponse;
}

export interface Stats {
  lesson: number;
  totalCorrect: number;
  totalQuestions: number;
  totalPlayers: number;
}

export interface IUpdateQuiz {
  name: string;
  category: string;
  difficulty: number;
  level: number;
  image: string;
}

export interface CreateBy {
  _id: string;
  name: string;
  avatar: string;
}
