import apiRequest from "@/lib/fetchApi";

export const createQuizApi = async (name: string) =>
  await apiRequest.post("/quiz/create", {
    name,
  });

export const getMetaQuizApi = async (id: string) => {
  return await apiRequest.get("/quiz/findMeta/" + id);
};

export const getByIdQuizPrivateApi = (id: string) =>
  apiRequest.get("/quiz/findByIdPrivate/" + id);
