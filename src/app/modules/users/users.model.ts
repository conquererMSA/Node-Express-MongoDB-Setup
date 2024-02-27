// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { model, Schema, Model, Types } from 'mongoose'
import { IUser, IUserMethods } from './users.interface'
import { UserModel } from './users.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'
// type UserModel = Model<IUser, object>
// type UserModel = Model<IUser, Record<string, unknown>> //better option
const userSchema = new Schema<IUser, Record<string, unknown>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    needsPassChanged: {
      type: Boolean,
      default: true,
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
//check user exist or not by instance methods, isUserExist method a User modelinstance method
userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Partial<IUser> | null> {
  return await User.findOne(
    { id },
    { id: 1, needsPassChanged: 1, role: 1, password: 1 },
  )
}
//Check password mathing by isPasswordMatch instance methods
userSchema.methods.isPasswordMatch = async function (
  givenPass: string,
  dbUserPass: string,
): Promise<boolean> {
  return bcrypt.compare(givenPass, dbUserPass)
}
//changed given or default password into hashed
userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.brcrypt_salt))
  next()
})
export const User = model<IUser, UserModel>('User', userSchema)
