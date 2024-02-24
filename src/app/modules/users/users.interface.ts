import { Model, Types } from 'mongoose'
import { TStudent } from '../student/studentInterface'

export type IUser = {
  id: string
  role: string
  password: string
  studentId: Types.ObjectId | TStudent
}
export type UserModel = Model<IUser, Record<string, unknown>> //better option
