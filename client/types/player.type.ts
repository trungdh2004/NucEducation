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
