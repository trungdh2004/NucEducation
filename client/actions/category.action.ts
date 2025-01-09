/* eslint-disable @typescript-eslint/no-explicit-any */
import apiRequest from "@/lib/fetchApi";
import { CateForm, CateResponse } from "@/types/Category.type";
import { Response, SearchTab } from "@/types/system.type";

export const createCateApi = (data: CateForm) =>
  apiRequest.post("/category/create", data);

export const updateCateApi = (id: string, data: CateForm) =>
  apiRequest.put("/category/update/" + id, data);

export const getByIdCateApi = (
  id: string
): Promise<{ message: string; data: CateResponse }> =>
  apiRequest.get("/category/getById/" + id);

export const pagingCateApi = (
  searchObject: SearchTab,
  options?: any
): Promise<Response<CateResponse>> =>
  apiRequest.post("/category/paging", searchObject, options);

export const deleteCateApi = (
  id: string
): Promise<{ message: string; data: CateResponse }> =>
  apiRequest.delete("/category/delete/" + id);

export const unDeleteCateApi = (
  id: string
): Promise<{ message: string; data: CateResponse }> =>
  apiRequest.delete("/category/unDelete/" + id);

export const getAllCateApi = (): Promise<CateResponse[]> =>
  apiRequest.get("/category/getAll");
