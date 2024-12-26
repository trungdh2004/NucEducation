import { z } from "zod";

export const categoryValidator = z.object({
  name: z.string().trim().min(1, {
    message: "Bạn chưa nhập tên",
  }),
  description: z.string().trim().min(1, {
    message: "Bạn chưa nhập mô tả",
  }),
  image: z.string().trim().min(1, {}),
});

export const validatorSearch = z.object({
  pageIndex: z.number().min(1),
  pageSize: z.number().min(1),
  keyword: z.string(),
  tab: z.number().optional(),
});
