import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorMessage, IGenericErrorResponse } from './errors-interface'

//simplified request zod error
export const zodErrorHandler = (zodError: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = zodError?.issues?.map(
    (issue: ZodIssue) => {
      return {
        path: issue?.path[issue?.path.length - 1],
        message: issue?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'zod Validation error',
    errorMessages: errors,
  }
}
