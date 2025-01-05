import { z } from "zod";

export const lessonValidator = z.object({
  name: z.string().trim().min(1),
  quizId: z.string().trim().min(1),
  type: z.enum(["live", "always", "exam"]),
  quizName: z.string().trim().min(1),
});

export const lessonPlayerValidator = z.object({
  id: z.string().trim().min(1),
  playerId: z.string().trim().min(1),
});

export const pagingLessonValidator = z.object({
  pageIndex: z.number(),
  pageSize: z.number().min(1),
  typeRunning: z.number(),
  date: z
    .string()
    .transform((val) => new Date(val)) // Chuyển chuỗi thành Date
    .refine((val) => !isNaN(val.getTime()), { message: "Invalid date" })
    .optional(),
  deleted: z.boolean().optional(),
});
