/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler } from 'express'
import config from '../config'
import { IGenericErrorMessage } from '../errors/errors-interface'
import handleValidationError from '../errors/ValidationErrorHandler'
import ApiError from '../errors/ApiError'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { errorLogger } from '../shared/logger'
import { ZodError } from 'zod'
import { zodErrorHandler } from '../errors/zodErrorHandler'
import handleCastError from '../errors/CastErrorHandlers'

// type IGenericErrorMessage = {
//   path: string
//   message: string
// }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandlers: ErrorRequestHandler = (error, req, res, next) => {
  //ekahne environment zodi dev hoy tahole log gulu consloe e print hobe, ar environment production hole errorLogger er moddhye zabe ebong store hobe
  // eslint-disable-next-line no-console
  config?.env === 'development' ? console.log(error) : errorLogger.error(error)

  let statusCode = 500
  let message = 'something went wrong'
  let errorMessages: IGenericErrorMessage[] = []
  const stack = config.env !== 'production' ? error?.stack : undefined
  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages //array of IGenericErrorMessages
  } else if (error?.name === 'CastError') {
    // res.status(500).json({ error: error })//castError ekta object
    const castSimpleError = handleCastError(error)
    statusCode = castSimpleError.statusCode
    message = castSimpleError.message
    errorMessages = castSimpleError.errorMessages
  } else if (error instanceof ZodError) {
    const zodSimpleError = zodErrorHandler(error)
    statusCode = zodSimpleError.statusCode
    message = zodSimpleError.message
    errorMessages = zodSimpleError.errorMessages
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }
  res.status(statusCode).json({
    statusCode,
    success: false,
    message,
    errorMessages,
    stack,
  })
}
export default globalErrorHandlers
