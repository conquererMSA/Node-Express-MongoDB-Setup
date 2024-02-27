import express from 'express'
import {
  changePassCon,
  loginUserCon,
  newAccessTokenCon,
} from './authController'
import { validateRequest } from '../users/validateRequest'
import { changePassZodSchema } from './authValidation'
import { authChecking } from '../../../Middlewares/authChecking'
const authRoutes = express.Router()
authRoutes
  .get('/login', loginUserCon)
  .get('/new-access-token', newAccessTokenCon)
  .patch(
    '/change-password',
    validateRequest(changePassZodSchema),
    authChecking('admin', 'faculty', 'student', 'manager'),
    changePassCon,
  )
export default authRoutes
