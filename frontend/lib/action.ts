import apiRequest from "./fetchApi";


export const apiListUser = () => apiRequest.get("/user/listUser")