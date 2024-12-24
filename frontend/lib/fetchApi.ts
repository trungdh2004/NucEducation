import { configApp } from "@/config/app.config";

/* eslint-disable @typescript-eslint/no-explicit-any */
fetch("");

const baseUrl = configApp.SERVER_URL;

type OptionsFetch = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body: any;
  headers?: Headers;
  cache?: "force-cache" | "no-store";
};

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve("token");
    }
  });

  failedQueue = [];
};

const refreshTokenRequest = async (): Promise<any> => {
  const response = await fetch(baseUrl + "/auth/refresh", {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to refresh token");
  }

  return response.json();
};

const fetchApi = async (url: string, options: OptionsFetch) => {
  const { method = "GET", body } = options;

  const initOptions: RequestInit = {
    ...options,
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: body,
  };

  const response = await fetch(`${baseUrl}/${url}`, initOptions);
  const res = await response.json();
  if (response.status !== 401) {
    if (!response.ok) {
      throw res;
    }
    return res;
  }

  if (isRefreshing) {
    // Nếu đang refresh thì thêm request hiện tại vào queue
    await new Promise<any>((resolve, reject) => {
      failedQueue.push({ resolve, reject });
    });
    return fetch(`${baseUrl}/${url}`, initOptions);
  }

  isRefreshing = true;

  try {
    // Gọi API refresh token
    await refreshTokenRequest();

    // Lưu token mới
    // Xử lý các request trong queue
    processQueue(null);

    // Gọi lại request ban đầu với token mới

    return fetch(`${baseUrl}/${url}`, initOptions);
  } catch (error) {
    processQueue(error);
    throw error;
  } finally {
    isRefreshing = false;
  }
};

function isFormData(value: any) {
  return value instanceof FormData;
}

const apiRequest = {
  post: async (url: string, body: any, options?: any) => {
    const urlRequest = url.startsWith("/") ? url.slice(1) : url;
    const data = isFormData(body) ? body : JSON.stringify(body);

    return await fetchApi(urlRequest, {
      method: "POST",
      body: data,
      ...options,
    });
  },
  get: async (url: string, options?: any) => {
    const urlRequest = url.startsWith("/") ? url.slice(1) : url;

    return fetchApi(urlRequest, {
      method: "GET",
      body: null,
      ...options,
    });
  },
};

export default apiRequest;
