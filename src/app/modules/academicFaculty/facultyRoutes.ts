import express from 'express'
import { validateRequest } from '../users/validateRequest'
import {
  createFacultyCon,
  deleteAFacultyCon,
  getAFacultyCon,
  updateAFacultyCon,
} from './facultyController'
import {
  createFacultyZodSchema,
  updateFacultyZodSchema,
} from './facultyZodValidation'
const facultyRoutes = express.Router()
facultyRoutes
  .patch('/:id', validateRequest(updateFacultyZodSchema), updateAFacultyCon)
  .delete('/:id', deleteAFacultyCon)
  .get('/:id', getAFacultyCon)
  .post(
    '/create-faculty',
    validateRequest(createFacultyZodSchema),
    createFacultyCon,
  )
export default facultyRoutes
