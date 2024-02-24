import express from 'express'
import { validateRequest } from '../users/validateRequest'
import {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
} from './validation.academicSemister'
import {
  createAcademicSemiCon,
  deleteAsemisterCon,
  getAllSemisterCon,
  getSingleSemisterCon,
  updateASemisterCon,
} from './academicSemisterController'
const academicRoutes = express.Router()
academicRoutes
  .patch(
    '/:id',
    validateRequest(updateAcademicSemisterZodSchema),
    updateASemisterCon,
  )
  .get('/:id', getSingleSemisterCon)
  .delete('/:id', deleteAsemisterCon)
  .post(
    '/create-semister',
    validateRequest(createAcademicSemisterZodSchema),
    createAcademicSemiCon,
  )
  .get('/all-semisters', getAllSemisterCon)
export default academicRoutes
