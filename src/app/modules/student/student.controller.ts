import httpStatus from 'http-status'
import { catchConAsync } from '../../../shared/catchConAsync'
import { sendConResponse } from '../../../shared/sendResponse'
import { createStudentService, updateStudentService } from './studentService'

export const createStudentCon = catchConAsync(async (req, res) => {
  const studentAllData = await createStudentService(
    req.body.student,
    req.body?.user ? req.body.user : {},
  )
  sendConResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Create student successfully',
    data: studentAllData,
  })
})

export const updateStudentCon = catchConAsync(async (req, res) => {
  const updatedStudent = await updateStudentService(
    req.params.id,
    req.body.updateStudent,
  )
  sendConResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Update student successfully',
    data: updatedStudent,
  })
})
