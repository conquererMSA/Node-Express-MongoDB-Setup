import { IAcademicSemister } from '../academicSemester/interface.academicSemister'
import { User } from './users.model'

export const findLastStudentId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const autoGenaretedUserId = async (semister:IAcademicSemister) => {
  const id = (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(id) + 1).toString().padStart(5, '0')
  incrementId=`${semister.year.substring(2)}${semister.code}${incrementId}`
  return incrementId
}
