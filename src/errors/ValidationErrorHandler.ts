import mongoose from 'mongoose'
import { IGenericErrorMessage } from './errors-interface'

//ValidationError response
type IGenericErrorResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMessage[]
}

const handleValidationError = (
  error: mongoose.Error.ValidationError,
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(error.errors).map(
    (error: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: error.path,
        message: error.message,
      }
    },
  )
  //errors=[{path:"Path 'role' is required",message:'role is required'},{path:"Path 'role' is required",message:'role is required'}]
  const statusCode = 400
  return {
    statusCode,
    message: 'Validation error',
    errorMessages: errors, //errors=[{path:"Path 'role' is required",message:'role is required'},{path:"Path 'role' is required",message:'role is required'}]
  }
}
export default handleValidationError
