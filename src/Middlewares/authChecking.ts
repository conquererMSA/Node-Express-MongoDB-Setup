import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../config'

export const authChecking = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Token must be provided')
      }
      //decoded the token then check then attach user in req object and send next middleware
      //remember token er moddhye role,id, password thakbe
      const verifiedToken = jwt.verify(token, config.jwt.secret as Secret)
      const verifiedUser = jwt.decode(token, { complete: true }) as JwtPayload
      if (roles.length && verifiedToken && roles.includes(verifiedUser?.role)) {
        //include verifiedUser in req obj in index.d.ts
        req.verifiedUser = verifiedUser
        next()
      } else {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid request!')
      }
    } catch (error) {
      next(error)
    }
  }
}
