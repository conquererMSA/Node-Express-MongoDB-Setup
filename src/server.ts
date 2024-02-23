/* eslint-disable no-console */
import mongoose from 'mongoose'
import { Server } from 'http'
import app from './app'
import config from './config/index'
import { errorLogger, infoLogger } from './shared/logger'

//handle uncaughtException
//uncaughtException synchronous code er error handle kore.uncaughtException application er vaireo hote apre tai server file er upore uncaughtException handle korte hoy
//console.log(x); //for uncaughtException
process.on('uncaughtException', error => {
  console.log('UncaughtException happend...')
  errorLogger.error(error)
  process.exit(1)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let server: Server
async function connectDB() {
  try {
    const db = await mongoose.connect(config.db_url as string)
    if (db) {
      // console.log('DB connects successfully')
      infoLogger.info('DB connects successfully')
      server = app.listen(config.port, () => {
        // console.log(`University App listening on port ${config.port}`)
        infoLogger.info(`University App listening on port ${config.port}`)
      })
    }
  } catch (err) {
    // console.log('Error from server.ts', error)
    errorLogger.error('Error from server.ts', err)
  }
  //handled unhandledRejection: asynchronous promise forget to handle
  process.on('unhandledRejection', error => {
    console.log(
      'Unhandled rejection happend. We are closing the server......off',
      error,
    )
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
    // process.exit(1)
  })
}

connectDB()

// console.log(x) //for uncaughtException //uncaughtException app er zekuno zaygay hote pare
//handled Signal Termination
//SIGTERM is process by process manager like pm2
process.on('SIGTERM', () => {
  console.log('SIGTERM is dedected')
  infoLogger.info('SIGTERM is received')
  if (server) {
    server.close()
  }
})
