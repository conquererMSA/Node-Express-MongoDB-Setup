import { RequestHandler } from 'express'
import { catchConAsync } from '../../../shared/catchConAsync'
import { createAFacultyService } from './facultyService'
import { sendConResponse } from '../../../shared/sendResponse'
import status from 'http-status'

export const createFacultyCon: RequestHandler = catchConAsync(
  async (req, res) => {
    const createdFaculty = await createAFacultyService(req.body.faculty)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Faculty created successfully',
      data: createdFaculty,
    })
  },
)
