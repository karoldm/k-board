import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email("Esse email não é válido"),
  name: z
  .string()
  .min(3, "O nome completo deve ter pelo menos 3 caracteres")
  .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "O nome deve conter apenas letras e espaços"),
  password: z.string().min(1, {message: "A senha deve ter pelo menos 1 caractere"}),
});