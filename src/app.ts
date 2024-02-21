/* eslint-disable no-console */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express, { Application, NextFunction, Response, Request } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.routes'
import globalErrorHandlers from './Middlewares/GlobalErrorHandlers'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ApiError from './errors/ApiError'
import academicRoutes from './app/modules/academicSemester/academicSemisterRoutes'
import httpStatus from 'http-status'
const app: Application = express()
app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
export default app
