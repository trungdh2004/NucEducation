import { z } from "zod";

export const playerValidator = z.object({
  name: z.string().trim().min(1).max(36),
  lessonId: z.string().trim().min(1),
  userId: z.string().optional(),
});
