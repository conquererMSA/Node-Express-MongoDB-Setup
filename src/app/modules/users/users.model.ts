import { model, Schema } from 'mongoose'
import { IUser } from './users.interface'
// type UserModel = Model<IUser, object>
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
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
  },
  { timestamps: true },
)
export const User = model<IUser>('User', userSchema)
