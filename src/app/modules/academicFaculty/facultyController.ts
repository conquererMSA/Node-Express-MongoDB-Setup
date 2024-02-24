import { RequestHandler } from 'express'
import { catchConAsync } from '../../../shared/catchConAsync'
import {
  createAFacultyService,
  deleteAFacultyService,
  getAFacultyService,
  updateAFacultyService,
} from './facultyService'
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
export const updateAFacultyCon = catchConAsync(async (req, res) => {
  const updatedFaculty = await updateAFacultyService(
    req.params.id,
    req.body.faculty,
  )
  sendConResponse(res, {
    statusCode: 200,
    message: 'Faculty updated successfully',
    data: updatedFaculty,
  })
})

export const getAFacultyCon = catchConAsync(async (req, res) => {
  const faculty = await getAFacultyService(req.params.id)
  sendConResponse(res, {
    statusCode: 200,
    message: 'Faculty retrieved successfully',
    data: faculty,
  })
})

export const deleteAFacultyCon = catchConAsync(async (req, res) => {
  const faculty = await deleteAFacultyService(req.params.id)
  sendConResponse(res, {
    statusCode: 200,
    message: 'Faculty deleted successfully',
    data: faculty,
  })
})
