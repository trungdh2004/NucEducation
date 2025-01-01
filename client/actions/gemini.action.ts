import apiRequest from "@/lib/fetchApi";

export const geminiQuestionApi = (text: string) =>
  apiRequest.post("/gemini/createQuestion", { text });
