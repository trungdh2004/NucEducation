export type TypeQuestion = "MTQ" | "SGQ" | "BLANK";

export interface QuestionDto {
  time: number;
  type: TypeQuestion;
  query: {
    text: string;
    image?: string | null;
  };
  answer: number[];
  options: OptionsQuestionDto[];
  quizId: string;
}

export interface OptionsQuestionDto {
  text: string;
  value: number;
}

export interface IQuestionResponse {
  query: Query;
  _id: string;
  aiGenerated: boolean;
  quizId: string;
  time: number;
  type: TypeQuestion;
  answer: number[];
  deleted: boolean;
  options: IOption[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface IOption {
  text: string;
  value: number;
  _id: string;
}

export interface Query {
  text: string;
  image: string;
}

export interface IQuestionAi {
  _id: string;
  query: {
    text: string;
    image: null;
  };
  aiGenerated: boolean;
  type: string;
  answer: number[];
  options: OptionsQuestionDto[];
}
