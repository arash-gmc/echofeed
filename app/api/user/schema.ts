import { z } from "zod";

export const newUserSchema = z.object({
  name: z.string().min(5).max(255),
  email: z.string().email(),
  password: z.string().min(5),
});
