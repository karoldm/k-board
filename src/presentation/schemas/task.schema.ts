import { z } from "zod";

export const taskSchema = z.object({
  color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Cor inválida"),
  description: z.string().min(1, {message: "A descrição deve ter pelo menos 1 caractere"}),
  title: z.string().min(1, {message: "O título deve ter pelo menos 1 caractere"}),
});