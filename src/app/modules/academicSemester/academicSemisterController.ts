import { Request, Response, NextFunction, RequestHandler } from 'express'
import { createSemisterService } from './academicSemisterService'
import { catchConAsync } from '../../../shared/catchConAsync'
import { sendConResponse } from '../../../shared/sendResponse'
import status from 'http-status'
//cathConAsync use korar age controller evabe chilo
// export const createAcademicSemiCon: RequestHandler = async (req, res, next) => {
//   try {
//     const { semisterData } = req.body
//     const createdSemister = await createSemisterService(semisterData)
//     res.status(200).json({
//       success: true,
//       message: 'create semister successfully',
//       data: createdSemister,
//     })
//   } catch (error) {
//     next(error)
//   }
// }

//catchConAsync ekti higher order function
//catchConAsync argument e ekti async middleware pathiye dey. catchConAsync ekti async middleware return kore

export const createAcademicSemiCon: RequestHandler = catchConAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const { semisterData } = req.body
    const createdSemister = await createSemisterService(semisterData)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Semister create successfully!',
      data: createdSemister,
    })
  },
)
