import { z } from 'zod'

export const newProjectSchema = z.object({
  title: z
    .string()
    .min(3, { message: 'O título deve ter pelo menos 3 caracteres' }),
})

export const enterProjectSchema = z.object({
  id: z
    .string()
    .regex(
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
      { message: 'O ID deve ser um UUID válido' }
    ),
})
