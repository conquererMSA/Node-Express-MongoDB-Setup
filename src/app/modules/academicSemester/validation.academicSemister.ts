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
const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    semisterData: z.object({
      title: z.enum(['Autumn', 'Fall', 'Summer'], {
        required_error: 'Title would be Autumn, Fall or Summer',
      }),
      code: z.enum(['01', '02', '03'], {
        required_error: 'Code would be 01, 02 or 03',
      }),
      year: z.number({
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
export default createAcademicSemisterZodSchema
