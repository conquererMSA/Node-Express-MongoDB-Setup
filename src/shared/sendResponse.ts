import { Response } from 'express'
type ApiData<T> = {
  statusCode: number
  message: string
  data: T | null
}
type ApiResponseData<T> = {
  success: true
  statusCode: number
  msessage: string
  data: T | null
}
export const sendConResponse = <T>(res: Response, data: ApiData<T>): void => {
  const apiResData: ApiResponseData<T> = {
    success: true,
    statusCode: data.statusCode,
    msessage: data.message,
    data: data.data,
  }
  res.status(data.statusCode).json({ apiResData })
}
