import apiRequest from "@/lib/fetchApi";
import { IUpdateQuiz } from "@/types/quizz.type";
import { SearchQuizDiPaging, SearchQuizPaging } from "@/types/system.type";

export const createQuizApi = async (name: string) =>
  await apiRequest.post("/quiz/create", {
    name,
  });

export const getMetaQuizApi = async (id: string) => {
  return await apiRequest.get("/quiz/findMeta/" + id);
};

export const getByIdQuizPrivateApi = (id: string) =>
  apiRequest.get("/quiz/findByIdPrivate/" + id);

export const getByIdQuizApi = (id: string) =>
  apiRequest.get("/quiz/findById/" + id);

export const updateQuizApi = async (id: string, obj: IUpdateQuiz) =>
  await apiRequest.put("/quiz/update/" + id, obj);

export const pagingQuizApi = async (obj: SearchQuizPaging) =>
  await apiRequest.post("/quiz/paging", obj);

export const deleteQuizApi = async (id: string) =>
  await apiRequest.delete("/quiz/delete/" + id);

export const lovedQuizApi = async (id: string, isLoved: boolean) =>
  await apiRequest.put("/quiz/loved/" + id, {
    isLoved,
  });

export const publicQuizApi = async (id: string) =>
  await apiRequest.put("/quiz/public/" + id, {});

export const pagingQuizDiApi = async (obj: SearchQuizDiPaging) =>
  await apiRequest.post("/quiz/pagingQuiz", obj);

export const listQuizHotApi = async () => await apiRequest.get("/quiz/listHot");
