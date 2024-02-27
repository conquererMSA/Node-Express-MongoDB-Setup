import z from 'zod'
export const changePassZodSchema = z.object({
  passwordData: z.object({
    oldPass: z.string({
      required_error: 'Old password is required',
    }),
    newPass: z.string({
      required_error: 'New password is required',
    }),
  }),
})
