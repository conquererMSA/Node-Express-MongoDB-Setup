import express from 'express'
import { validateRequest } from '../users/validateRequest'
import createAcademicSemisterZodSchema from './validation.academicSemister'
import {
  createAcademicSemiCon,
  getAllSemisterCon,
} from './academicSemisterController'
const academicRoutes = express.Router()
academicRoutes
  .post(
    '/create-semister',
    validateRequest(createAcademicSemisterZodSchema),
    createAcademicSemiCon,
  )
  .get('/all-semisters', getAllSemisterCon)
export default academicRoutes
