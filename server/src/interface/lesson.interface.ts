export interface ILessonDto {
  name: string;
  quizId: string;
  type: string;
  quizName: string;
}

export interface ILessonPaging {
  pageIndex: number;
  pageSize: number;
  typeRunning: number;
  date?: Date;
  deleted: boolean;
  createBy: string;
}
