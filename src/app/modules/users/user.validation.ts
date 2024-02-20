import z from 'zod'
//handle req in route level by zodSchema
export const createUserZodSchema = z.object({
  body: z.object({
    user: z.object({
      name: z.string({
        required_error: 'name is required',
      }),
      role: z.string({
        required_error: 'role is required',
      }),
      password: z.string().optional(),
    }),
  }),
})
