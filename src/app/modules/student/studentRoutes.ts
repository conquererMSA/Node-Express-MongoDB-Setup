import express from 'express'
import { createStudentCon, updateStudentCon } from './student.controller'
import { validateRequest } from '../users/validateRequest'
import {
  createStudentValidationSchema,
  updateStudentValidationSchema,
} from './studentZodValidation'
//030300005
const studentRoutes = express.Router()
studentRoutes
  .patch(
    '/:id',
    validateRequest(updateStudentValidationSchema),
    updateStudentCon,
  )
  // {
  //   "updateStudent":{
  //     "guardian":{
  //       "fatherName":"iiii"
  //     },
  //     "bloodGroup":"AB+",
  //      "localGuardian":{
  //       "name":"PSY"
  //      }
  //   }
  // }
  .post(
    '/create-student',
    validateRequest(createStudentValidationSchema),
    createStudentCon,
  )
export default studentRoutes

// {
//   "student":{
//     "name":{
//       "firstName":"MSA",
//       "middleName":"TCSY",
//       "lastName":"Adeel"
//     },
//     "gender":"male",
//     "contactNo":"565656",
//     "email":"j.sanah1234@gmail.com",
//     "bloodGroup":"B+",
//     "dateOfBirth":"2-1-1998",
//     "emergencyContactNo":"45654655436"
//     "presentAddress":"Sylhet",
//     "permanentAddress":"Sylhet",
//     "profileImg":"httwpe.ewg",
//     "localGuardian":{
//       "name":"Fatih",
//       "occupation":"Holder",
//       "contactNo":"957564",
//       "address":"CGT"

//     },
//     "guardian":{
//       "fatherName":"XXY",
//       "fatherOccupation":"Molder",
//       "fatherContactNo":"57473455",
//       "motherName":"YRTR",
//       "motherContactNo":"4567546",
//       "motherOccupation":"6676546"
//     },
//     "facultyId":"65d882481a0f7c657cfdd400",
//     "departmentId":"65d882ddc5e862e82af155a3",
//     "semisterId":"65d4e368b29b916b135d711e"
//   }
// }
