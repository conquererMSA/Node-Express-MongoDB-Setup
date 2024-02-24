import express from 'express'
import {
  createADeptCon,
  deleteADeptCon,
  getADeptCon,
  updateADeptCon,
} from './departmentController'
import { validateRequest } from '../users/validateRequest'
import {
  createDeptZodSchema,
  updateDeptZodSchema,
} from './departmentValidation'
const deptRoutes = express.Router()
deptRoutes
  .patch('/:id', validateRequest(updateDeptZodSchema), updateADeptCon)
  .delete('/:id', deleteADeptCon)
  .get('/:id', getADeptCon)
  .post('/create-dept', validateRequest(createDeptZodSchema), createADeptCon)
export default deptRoutes
