import mongoose from 'mongoose'
import config from '../../../config'
import AcademicSemister from '../academicSemester/model.academicSemister'
import { IUser } from '../users/users.interface'
import { autoGenaretedStudentId } from './student.utils'
import { TStudent, TUserName } from './studentInterface'
import { Student } from './studentModel'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'
import { User } from '../users/users.model'

export const createStudentService = async (student: TStudent, user: IUser) => {
  console.log('student', student)

  //app default password
  if (!user?.password) {
    user.password = config.default_pass as string
  }
  //set default role for student
  user.role = 'student'
  let userAllData
  const semister = await AcademicSemister.findById(student?.semisterId)
  console.log('semister', semister)

  const session = await mongoose.startSession()
  try {
    if (semister?.code) {
      session.startTransaction()
      const generatedStudentId = await autoGenaretedStudentId(semister)
      user.id = generatedStudentId
      student.userId = generatedStudentId

      //create student to Student model
      const newStudent = await Student.create([student], { session })
      // console.log('new student', newStudent)

      if (!newStudent.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Student could not create')
      }
      //set studentId in user and create user to User model
      user.studentId = newStudent[0]?._id
      // console.log('user', user)

      const newUser = await User.create([user], { session })
      // console.log('new user', newUser)

      userAllData = newUser[0]
      if (!newUser.length) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'User could not create')
      }
      await session.commitTransaction()
      await session.endSession()
    }
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (userAllData) {
    userAllData = await User.findOne({ id: userAllData?.id }).populate({
      path: 'studentId',
      populate: [
        {
          path: 'semisterId',
        },
        {
          path: 'departmentId',
        },
        {
          path: 'facultyId',
        },
      ],
    })
  }

  return userAllData
}

export const updateStudentService = async (
  id: string,
  student: Partial<TStudent>,
): Promise<TStudent | null> => {
  const { name, localGuardian, guardian, ...restStudet } = student
  const updateStudent: Partial<TStudent> = restStudet
  const isExist = await Student.findOne({ userId: id })
  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Student could not found')
  }
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key: string) => {
      const nameKey = `name.${key}` as keyof TUserName //name.firstName
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateStudent as any)[nameKey] = name[key]
    })
  }
}
