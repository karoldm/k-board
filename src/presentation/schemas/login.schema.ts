import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Esse email não é válido"),
  password: z.string().min(1, {message: "A senha deve ter pelo menos 1 caractere"}),
});