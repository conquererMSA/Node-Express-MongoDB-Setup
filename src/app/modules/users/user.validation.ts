import z from 'zod'
//handle req in route level by zodSchema
export const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      password: z.string().optional(),
    }),
  }),
})
