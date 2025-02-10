import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(3, {message: "O título deve ter pelo menos 3 caracteres"})
});