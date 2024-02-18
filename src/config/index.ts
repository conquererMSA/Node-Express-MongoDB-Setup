/* eslint-disable no-undef */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })
export default {
  port: process.env.PORT,
  db_url: process.env.DB_URL,
  env: process.env.NODE_ENV,
  default_pass: process.env.DEFAULT_PASS,
}
