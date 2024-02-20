import { NextFunction, Request, Response } from 'express'
import { AnyZodObject } from 'zod'

export const validateRequest = (zodSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
        params: req.params,
        query: req.query,
        cookies: req.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }
}
