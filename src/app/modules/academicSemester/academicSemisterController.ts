import { RequestHandler } from 'express'
import { createSemisterService } from './academicSemisterService'

export const createAcademicSemiCon: RequestHandler = async (req, res, next) => {
  try {
    const { semisterData } = req.body
    const createdSemister = await createSemisterService(semisterData)
    res.status(200).json({
      success: true,
      message: 'create semister successfully',
      data: createdSemister,
    })
  } catch (error) {
    next(error)
  }
}
