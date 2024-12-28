export interface QuestionDto {
  aiGenerated: boolean;
  time: number;
  type: "MTQ" | "SGQ" | "BLANK";
  query: {
    text: string;
    image: string | null;
  };
  answer: number | number[];
  deleted: boolean;
  options: OptionsQuestionDto[];
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
  description: string;
  image: string;
  category: string;
  level: number;
  difficulty: number;
}
