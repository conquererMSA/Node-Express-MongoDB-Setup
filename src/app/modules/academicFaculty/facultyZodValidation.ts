import z from 'zod'
export const createFacultyZodSchema = z.object({
  body: z.object({
    faculty: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
    }),
  }),
})
export const updateFacultyZodSchema = z.object({
  body: z.object({
    faculty: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
    }),
  }),
})
