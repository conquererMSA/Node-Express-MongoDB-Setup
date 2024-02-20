import express from 'express'
import { createUserCon } from './users.controller'
import { validateRequest } from './validateRequest'
import { createUserZodSchema } from './user.validation'
const userRouter = express.Router()
userRouter.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  createUserCon,
)
export default userRouter
