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

export const quizCreateValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Bạn chưa nhập tên",
    })
    .max(64),
});

export const quizUpdateValidator = z.object({
  name: z
    .string()
    .trim()
    .min(1, {
      message: "Bạn chưa nhập tên",
    })
    .max(64),
  description: z
    .string()
    .trim()
    .min(1, {
      message: "Bạn chưa nhập mô tả",
    })
    .max(128),
  image: z.string().trim().min(1, {
    message: "Bạn chưa nhập mô tả",
  }),
  category: z.string().trim().min(1, {
    message: "Bạn chưa nhập mô tả",
  }),
  level: z.number().min(1, {
    message: "Bạn chưa nhập mô tả",
  }),
  difficulty: z.number().min(1, {}),
});

export const questionValidator = z.object({
  query: z.object({
    text: z.string().trim().min(1),
    image: z.string().optional(),
  }),
  time: z.number(),
  answer: z
    .number()
    .array()
    .refine((data) => data.length >= 1),
  quizId: z.string().trim().min(1),
  options: z.array(
    z.object({
      text: z.string().trim().min(1, {
        message:"Bạn chưa điền câu hỏi"
      }),
      value: z.number(),
    })
  ),
  type: z.enum(["MTQ", "SGQ", "BLANK"]),
});
