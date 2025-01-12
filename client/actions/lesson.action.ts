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

export const pagingAdminLessonApi = (obj: IPagingLesson) =>
  apiRequest.post("/lesson/pagingAdmin/", obj);

export const detailLessonApi = (id: string) =>
  apiRequest.get("/lesson/detail/" + id);

export const endLessonApi = (id: string) =>
  apiRequest.put("/lesson/endLesson/" + id, {});

export const reportsLessonAdmin = (id: string) =>
  apiRequest.get("/lesson/reportsLessonAdmin/" + id);

export const joinCodeLessonApi = (code: string) =>
  apiRequest.post("/lesson/code", {
    code,
  });
