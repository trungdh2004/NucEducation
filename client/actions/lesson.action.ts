import apiRequest from "@/lib/fetchApi";
import {
  IPagingLesson,
  LessonLiveRequest,
  LessonPlayerResponse,
  LessonResponseReview,
} from "@/types/lesson.type";

export const lessonLiveApi = (obj: LessonLiveRequest) =>
  apiRequest.post("/lesson/createLive", obj);

export const lessonFindJoinApi = (id: string): Promise<LessonResponseReview> =>
  apiRequest.get("/lesson/findByJoin/" + id);

export const lessonPlayerApi = (
  id: string,
  playerId: string
): Promise<LessonPlayerResponse> =>
  apiRequest.post("/lesson/playerLesson", { id, playerId });

export const pagingLessonApi = (obj: IPagingLesson) =>
  apiRequest.post("/lesson/paging/", obj);
