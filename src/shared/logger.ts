/* eslint-disable no-undef */
import path from 'path'
import DailyRotateFile from 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'
const {
  combine,
  timestamp,
  label,
  printf,
  //prettyPrint
} = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seceonds = date.getMinutes()
  return `${date.toDateString()} ${hours}:${minutes}:${seceonds} [${label}] ${level}: ${message}`
})
//rotate winsto file
export const infoLogger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'UNM-Info' }),
    timestamp(),
    myFormat,
    //info prettyPrint korle mesg and label,level time print kore dey.prettPrint object print kore
    // prettyPrint(),
  ),
  transports: [
    new DailyRotateFile({
      level: 'info',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        '%DATE%-info.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
    new transports.Console(),
  ],
})

export const errorLogger = createLogger({
  level: 'error',
  format: combine(
    label({ label: 'UNM-Error' }),
    timestamp(),
    myFormat,
    //error prettyPrint korle puru error stack print kore dey.prettPrint object print kore
    // prettyPrint(),
  ),
  transports: [
    new transports.Console(),
    new DailyRotateFile({
      level: 'error',
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        '%DATE%-error.log',
      ),
      datePattern: 'HH-DD-MM-YYYY',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
