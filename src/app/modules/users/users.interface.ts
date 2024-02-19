import { Model } from 'mongoose'

export type IUser = {
  name: string
  id: string
  role: string
  password: string
}
export type UserModel = Model<IUser, Record<string, unknown>> //better option
