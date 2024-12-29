import apiRequest from "@/lib/fetchApi";
import { IQuestionResponse, QuestionDto } from "@/types/question.type";

export const createQuestionApi = async (value: QuestionDto) =>
  await apiRequest.post("/question/create", value);

export const getOneQuestionApi = async (
  id: string
): Promise<IQuestionResponse> => {
  return await apiRequest.get("/question/getOne/" + id);
};

export const updateQuestionApi = async (id: string, value: QuestionDto) =>
  await apiRequest.put("/question/update/" + id, value);
