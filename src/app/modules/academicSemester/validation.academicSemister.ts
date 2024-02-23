import z from 'zod'
// const months: string[] = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
export const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    semisterData: z.object({
      title: z.enum(['Autumn', 'Fall', 'Summer'], {
        required_error: 'Title would be Autumn, Fall or Summer',
      }),
      code: z.enum(['01', '02', '03'], {
        required_error: 'Code would be 01, 02 or 03',
      }),
      year: z.string({
        required_error: 'Year is required',
      }),
      startMonth: z.enum(
        [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        {
          required_error: 'startMonth would be Jan-Dec',
        },
      ),
      endMonth: z.enum(
        [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          'August',
          'September',
          'October',
          'November',
          'December',
        ],
        {
          required_error: 'endMonth would be Jan-Dec',
        },
      ),
    }),
  }),
})
export const updateAcademicSemisterZodSchema = z.object({
  body: z.object({
    data: z
      .object({
        title: z
          .enum(['Autumn', 'Fall', 'Summer'], {
            required_error: 'Title would be Autumn, Fall or Summer',
          })
          .optional(),
        code: z
          .enum(['01', '02', '03'], {
            required_error: 'Code would be 01, 02 or 03',
          })
          .optional(),
        year: z
          .string({
            required_error: 'Year is required',
          })
          .optional(),
        startMonth: z
          .enum(
            [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            {
              required_error: 'startMonth would be Jan-Dec',
            },
          )
          .optional(),
        endMonth: z
          .enum(
            [
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December',
            ],
            {
              required_error: 'endMonth would be Jan-Dec',
            },
          )
          .optional(),
      })
      .refine(
        data => (data.title && data.code) || (!data.title && !data.code),
        'Either code and title should be provided neither nor',
      ),
  }),
})
