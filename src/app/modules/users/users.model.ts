// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { model, Schema, Model, Types } from 'mongoose'
import { IUser } from './users.interface'
import { UserModel } from './users.interface'
// type UserModel = Model<IUser, object>
// type UserModel = Model<IUser, Record<string, unknown>> //better option
const userSchema = new Schema<IUser>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    studentId: {
      type: Types.ObjectId,
    },
  },
  { timestamps: true },
)
export const User = model<IUser, UserModel>('User', userSchema)
