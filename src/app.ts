import express, { Application } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/users.routes'
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

//Application routes
app.use('/api/v1/users', userRouter)

export default app
