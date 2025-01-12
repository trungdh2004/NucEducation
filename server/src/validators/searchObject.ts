import { z } from "zod";

export const pagingValidator = z.object({
  pageIndex: z.number(),
  pageSize: z.number().min(1),
  keyword: z.string(),
});
