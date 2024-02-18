import express from 'express'
import { createUserCon } from './users.controller'
const userRouter = express.Router()
userRouter.post('/create-user', createUserCon)
export default userRouter
