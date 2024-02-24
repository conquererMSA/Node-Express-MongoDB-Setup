import z from 'zod'
export const createDeptZodSchema = z.object({
  body: z.object({
    dept: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      faculty: z.string({
        required_error: 'Faculty Id is required',
      }),
    }),
  }),
})
export const updateDeptZodSchema = z.object({
  body: z.object({
    dept: z.object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .optional(),
      faculty: z
        .string({
          required_error: 'faculty id is required',
        })
        .optional(),
    }),
  }),
})
