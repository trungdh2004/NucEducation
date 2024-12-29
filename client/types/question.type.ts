export interface QuestionDto {
  time: number;
  type: "MTQ" | "SGQ" | "BLANK";
  query: {
    text: string;
    image?: string;
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
  type: "MTQ" | "SGQ" | "BLANK";
  answer: number[];
  deleted: boolean;
  options: Option[];
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Option {
  text: string;
  value: number;
  _id: string;
}

export interface Query {
  text: string;
  image: string;
}
