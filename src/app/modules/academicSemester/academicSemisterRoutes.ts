import express from 'express'
import { validateRequest } from '../users/validateRequest'
import createAcademicSemisterZodSchema from './validation.academicSemister'
import { createAcademicSemiCon } from './academicSemisterController'
const academicRoutes = express.Router()
academicRoutes.post(
  '/create-semister',
  validateRequest(createAcademicSemisterZodSchema),
  createAcademicSemiCon,
)
export default academicRoutes
