import apiRequest from "@/lib/fetchApi";
import { PlayerCreate } from "@/types/player.type";

export const createPlayerApi = (obj: PlayerCreate) =>
  apiRequest.post("/player/create", obj);
