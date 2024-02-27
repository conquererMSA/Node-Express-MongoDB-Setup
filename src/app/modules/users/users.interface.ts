import { Model, Types } from 'mongoose'
import { TStudent } from '../student/studentInterface'

export type IUser = {
  id: string
  role: string
  password: string
  needsPassChanged?: true | false
  studentId?: Types.ObjectId | TStudent
  // facultyId?:Types.ObjectId|IFacultyPerson
  // adminId?:Types.ObjectId|IAdmin
}
export type LoginUserResponse = {
  accessToken: string
  refreshToken?: string
  needsPassChanged: boolean | undefined
}
//belows are instance method
export type IUserMethods = {
  isUserExist(id: string): Promise<Partial<IUser> | null>
  isPasswordMatch(givenPass: string, dbUserPass: string): Promise<boolean>
}
export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods> //better option
