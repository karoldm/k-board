import { z } from 'zod'

export const editPasswordSchema =  z
.object({
  password: z.string().min(8, {message: "A senha deve conter pelo menos 8 caracteres"}),
  confirm: z.string(),
})
.refine((data) => data.password === data.confirm, {
  message: "As senhas devem ser iguais",
  path: ["confirm"],
});
