import { z } from "zod";

export const playerValidator = z.object({
  name: z.string().trim().min(1).max(36),
  lessonId: z.string().trim().min(1),
  userId: z.string().optional(),
});

export const playerProceedValidator = z.object({
  lessonId: z.string().trim().min(1),
  playerId: z.string().trim().min(1),
  questionId: z.string().trim().min(1),
  response: z.array(z.union([z.number(), z.string()])),
});
