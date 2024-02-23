import mongoose from 'mongoose'
import { IGenericErrorMessage, IGenericErrorResponse } from './errors-interface'

//castError response
// type IGenericErrorResponse = {
//   statusCode: number
//   message: string
//   errorMessages: IGenericErrorMessage[]
// }

const handleCastError = (
  error: mongoose.Error.CastError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = [
    {
      path: error?.path,
      message: 'Invalid ObjectId',
    },
  ]
  //errors=[{path:"Path 'role' is required",message:'role is required'},{path:"Path 'role' is required",message:'role is required'}]
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors, //errors=[{path:"Path 'role' is required",message:'role is required'},{path:"Path 'role' is required",message:'role is required'}]
  }
}
export default handleCastError
