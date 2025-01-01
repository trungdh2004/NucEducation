import apiRequest from "@/lib/fetchApi";
import {
  IQuestionAi,
  IQuestionResponse,
  QuestionDto,
} from "@/types/question.type";

export const createQuestionApi = async (value: QuestionDto) =>
  await apiRequest.post("/question/create", value);

export const getOneQuestionApi = async (
  id: string
): Promise<IQuestionResponse> => {
  return await apiRequest.get("/question/getOne/" + id);
};

export const updateQuestionApi = async (id: string, value: QuestionDto) =>
  await apiRequest.put("/question/update/" + id, value);

export const deleteQuestionApi = async (id: string) =>
  await apiRequest.delete("/question/delete/" + id);

export const copyQuestionApi = async (id: string) =>
  await apiRequest.get("/question/copy/" + id);

export const createManyQuestionApi = async (
  id: string,
  data: Omit<IQuestionAi, "_id">[]
): Promise<IQuestionResponse[]> =>
  await apiRequest.post("/question/createManyAI/" + id, {
    data: data,
  });
