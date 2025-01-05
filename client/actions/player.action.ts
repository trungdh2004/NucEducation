import apiRequest from "@/lib/fetchApi";
import { PlayerCreate, PlayerProceed } from "@/types/player.type";

export const createPlayerApi = (obj: PlayerCreate) =>
  apiRequest.post("/player/create", obj);

export const proceedPlayerApi = (obj: PlayerProceed) =>
  apiRequest.post("/player/proceedGame", obj);

export const finishPlayerApi = (id: string) =>
  apiRequest.put("/player/finishGame/" + id, {});

export const dataFinishPlayerApi = (id: string) =>
  apiRequest.get("/player/dataFinish/" + id);
