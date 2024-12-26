import apiRequest from "@/lib/fetchApi";


export const logoutApi =async () => await apiRequest.get("/auth/logout");  