import { z } from 'zod'
const createUserNameValidationSchema = z.object({
  firstName: z
    .string({
      required_error: 'First Name is required',
    })
    .min(1)
    .max(20)
    .refine(value => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string({
    required_error: 'Last Name is required',
  }),
})

const createGuardianValidationSchema = z.object({
  fatherName: z.string({
    required_error: 'Father Name is required',
  }),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string({
    required_error: 'Father contact is required',
  }),
  motherName: z.string({
    required_error: 'Mother Name is required',
  }),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string({
    required_error: 'Mother contact is required',
  }),
})

const createLocalGuardianValidationSchema = z.object({
  name: z.string({
    required_error: 'Local guardian name is required',
  }),
  occupation: z.string().optional(),
  contactNo: z.string({
    required_error: 'Local guardian contact is required',
  }),
  address: z.string({
    required_error: 'Local guardian address is required',
  }),
})
export const createStudentValidationSchema = z.object({
  body: z.object({
    user: z.object({}).optional(),
    student: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum(['male', 'female', 'other']),
      dateOfBirth: z.string().optional(),
      email: z
        .string({
          required_error: 'Email is required',
        })
        .email(),
      contactNo: z.string({
        required_error: 'Contact is required',
      }),
      emergencyContactNo: z.string({
        required_error: 'Emergency contact is required',
      }),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string({
        required_error: 'Present address is required',
      }),
      permanentAddress: z.string({
        required_error: 'Parmanent address is required',
      }),
      profileImg: z.string().optional(),
      guardian: createGuardianValidationSchema,
      localGuardian: createLocalGuardianValidationSchema,
      semisterId: z.string({
        required_error: 'Semister Id is required',
      }),
      departmentId: z.string({
        required_error: 'Dept Id is required',
      }),
      facultyId: z.string({
        required_error: 'Faculty Id is required',
      }),
    }),
  }),
})

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
})

const updateGuardianValidationSchema = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
})

const updateLocalGuardianValidationSchema = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
})

export const updateStudentValidationSchema = z.object({
  body: z.object({
    updateStudent: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z.enum(['male', 'female', 'other']).optional(),
      dateOfBirth: z.string().optional(),
      email: z.string().email().optional(),
      contactNo: z.string().optional(),
      emergencyContactNo: z.string().optional(),
      bloogGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
        .optional(),
      presentAddress: z.string().optional(),
      permanentAddress: z.string().optional(),
      guardian: updateGuardianValidationSchema.optional(),
      localGuardian: updateLocalGuardianValidationSchema.optional(),
      semister: z.string().optional(),
      department: z.string().optional(),
    }),
  }),
})

// {
//   "updateStudent":{
//     "name":{
//       "lastName":"KKK"
//     },
//     "email":"z@gmail.com"
//   }
// }
