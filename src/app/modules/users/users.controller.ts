import { createUserService } from './users.service'
import { catchConAsync } from '../../../shared/catchConAsync'
import { RequestHandler } from 'express'
import { sendConResponse } from '../../../shared/sendResponse'
import httpStatus from 'http-status'

//catchConAsync ekti higher order function
//catchConAsync argument e ekti async middleware pathiye dey. catchConAsync ekti async middleware return kore
//cathConAsync use korar age controller evabe chilo
// export const createUserCon: RequestHandler = async (req, res, next) => {
//   try {
//     //handle req object by Zod Schema
//     const { user } = req.body
//     const createdUser = await createUserService(user)
//     res.status(200).json({
//       success: true,
//       message: 'User create successfully',
//       data: createdUser,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

//catchConAsync ekti higher order function
//catchConAsync argument e ekti async middleware pathiye dey. catchConAsync ekti async middleware return kore
export const createUserCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    //handle req object by Zod Schema
    const { user } = req.body
    const createdUser = await createUserService(user)
    sendConResponse(res, {
      statusCode: httpStatus.OK,
      message: 'User created successfully',
      data: createdUser,
    })
  },
)
