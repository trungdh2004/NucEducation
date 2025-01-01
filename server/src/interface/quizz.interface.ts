export interface QuestionDto {
  aiGenerated: boolean;
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

export interface QuizDto {
  name: string;
}

export interface QuizUpdateDto {
  name: string;
  image: string;
  category: string;
  level: number;
  difficulty: number;
}

export interface QuestionAiDto {
  type: "MTQ" | "SGQ" | "BLANK";
  query: {
    text: string;
    image?: string;
  };
  answer: number[];
  options: OptionsQuestionDto[];
}

export interface QuizPagingDto {
  pageIndex: number;
  pageSize: number;
  isPublic: boolean;
  sort: 1 | -1;
  isLove?: boolean;
}
