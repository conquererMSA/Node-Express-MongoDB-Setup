import { RequestHandler } from 'express'
import { catchConAsync } from '../../../shared/catchConAsync'
import {
  createADeptService,
  deleteADeptService,
  getADeptService,
  updateADeptService,
} from './departmentService'
import { sendConResponse } from '../../../shared/sendResponse'
import status from 'http-status'

export const createADeptCon: RequestHandler = catchConAsync(
  async (req, res) => {
    const createdDept = await createADeptService(req.body.dept)
    sendConResponse(res, {
      statusCode: status.OK,
      message: 'Dept created successfully',
      data: createdDept,
    })
  },
)
export const updateADeptCon = catchConAsync(async (req, res) => {
  const updatedDept = await updateADeptService(req.params.id, req.body.dept)
  sendConResponse(res, {
    statusCode: 200,
    message: 'Dept updated successfully',
    data: updatedDept,
  })
})

export const getADeptCon = catchConAsync(async (req, res) => {
  const dept = await getADeptService(req.params.id)
  sendConResponse(res, {
    statusCode: 200,
    message: 'Dept retrieved successfully',
    data: dept,
  })
})

export const deleteADeptCon = catchConAsync(async (req, res) => {
  const dept = await deleteADeptService(req.params.id)
  sendConResponse(res, {
    statusCode: 200,
    message: 'Dept deleted successfully',
    data: dept,
  })
})
