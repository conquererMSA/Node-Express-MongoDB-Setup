import { Request, Response } from 'express'
import { createUserService } from './users.service'

export const createUserCon = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const createdUser = await createUserService(user)
    res.status(200).json({
      success: true,
      message: 'User create successfully',
      data: createdUser,
    })
  } catch (error) {
    res
      .status(400)
      .json({ success: false, error: 'Cant create user', data: null })
  }
}
