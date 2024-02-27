/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Response, Request } from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRouter from './app/modules/users/users.routes'
import globalErrorHandlers from './Middlewares/GlobalErrorHandlers'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ApiError from './errors/ApiError'
import academicRoutes from './app/modules/academicSemester/academicSemisterRoutes'
import httpStatus from 'http-status'
import facultyRoutes from './app/modules/academicFaculty/facultyRoutes'
import deptRoutes from './app/modules/academicDepartment/departmentRoutes'
import studentRoutes from './app/modules/student/studentRoutes'
import authRoutes from './app/modules/auth/authRoutes'
// import { autoGenaretedUserId } from './app/modules/users/users.utils'
const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//**************************/
// eslint-disable-next-line no-console, no-undef
//console.log(process.env); ekhane env object ta pabo. env object e node-express er onek variable ache

// eslint-disable-next-line no-console
//console.log(app.get('env')) ekhane current environment ta pabo
//******************* */

//Class:Coustom error handling

//Application routes
app.use('/api/v1/users', userRouter)
app.use('/api/v1/semister', academicRoutes)
app.use('/api/v1/faculty', facultyRoutes)
app.use('/api/v1/department', deptRoutes)
app.use('/api/v1/student', studentRoutes)
app.use('/api/v1/auth', authRoutes)

// //testing route
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
//   //   throw new Error('Coustom error in app.ts')
//   //   throw new ApiError(400, 'ApiError coustom error in app.ts')
//   //   next('Error goes to global error handler')
//   // for handling unhandled rejection *make the middleware async
// //   Promise.reject(new Error('For unhandled rejection'))
//   // for uncaughtException
//   //   console.log(x)
// })
//Global Error Handler
app.use(globalErrorHandlers)

//handle not route found
app.use('*', (req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Invalid Request',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'Route not found',
      },
    ],
  })
})
// const testSemister = {
//   title: 'Autumn',
//   code: '01',
//   year: '2017',
//   startMonth: 'May',
//   endMonth: 'April',
// }
// const testId = async () => {
//   const id = await autoGenaretedUserId(testSemister)
//   console.log(id)
// }
// testId()
export default app
