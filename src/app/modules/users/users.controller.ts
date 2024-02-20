import { RequestHandler } from 'express'
import { createUserService } from './users.service'

export const createUserCon: RequestHandler = async (req, res, next) => {
  try {
    //handle req object by Zod Schema
    const { user } = req.body
    const createdUser = await createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: createdUser,
    })
  } catch (error) {
    next(error)
  }
}
