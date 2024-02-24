import { IAcademicSemister } from '../academicSemester/interface.academicSemister'
import { User } from '../users/users.model'

export const findLastStudentId = async () => {
  const lastStudet = await User.findOne({ role: 'student' }, { _id: 0, id: 1 })
    .sort({ createdAt: -1 })
    .lean()
  return lastStudet?.id ? lastStudet?.id?.substring(4) : undefined
}

export const autoGenaretedStudentId = async (semister: IAcademicSemister) => {
  const id = (await findLastStudentId()) || (0).toString().padStart(5, '0')
  let incrementId = (parseInt(id) + 1).toString().padStart(5, '0')
  incrementId = `${semister.year.substring(2)}${semister.code}${incrementId}`
  return incrementId
}
