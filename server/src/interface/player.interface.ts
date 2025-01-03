export interface PlayerDto {
  name: string;
  userId?: string;
  lessonId: string;
}

export interface ProceedDto {
  lessonId: string;
  playerId: string;
  questionId: string;
  response: (number | string)[];
}
