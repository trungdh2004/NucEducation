import apiRequest from "@/lib/fetchApi";

export const uploadSingerApi = (
  data: File,
  width?: number,
  height?: number
) => {
  const uri = `/upload/singer${
    width || height
      ? `?${width ? `width=${width}` : ""}${width && height ? "&" : ""}${
          height ? `height=${height}` : ""
        }`
      : ""
  }`;
  const formData = new FormData();
  formData.append("image", data);
  return apiRequest.post(uri, formData);
};

export const uploadMultipleApi = (
  data: File,
  width?: number,
  height?: number
) => {
  const uri = `/upload/multipleImage${
    width || height
      ? `?${width ? `width=${width}` : ""}${width && height ? "&" : ""}${
          height ? `height=${height}` : ""
        }`
      : ""
  }`;
  const formData = new FormData();
  formData.append("images", data);
  return apiRequest.post(uri, formData);
};
