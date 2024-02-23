import express from 'express'
import { validateRequest } from '../users/validateRequest'
import { createFacultyCon } from './facultyController'
import { createFacultyZodSchema } from './facultyZodValidation'
const facultyRoutes = express.Router()
facultyRoutes.post(
  '/create-faculty',
  validateRequest(createFacultyZodSchema),
  createFacultyCon,
)
export default facultyRoutes
