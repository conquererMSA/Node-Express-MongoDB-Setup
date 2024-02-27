import express from 'express'
import { loginUserCon, newAccessTokenCon } from './authController'
const authRoutes = express.Router()
authRoutes.get('/login', loginUserCon)
authRoutes.get('/new-access-token', newAccessTokenCon)
export default authRoutes
