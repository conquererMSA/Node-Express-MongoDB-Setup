import { RequestHandler, Request, Response, NextFunction } from 'express'

//catchConAsync ekti higher order function
//catchConAsync ekti middleware return kore
export const catchConAsync = (asyncMiddleware: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      asyncMiddleware(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
