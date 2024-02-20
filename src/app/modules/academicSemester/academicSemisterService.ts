import { IAcademicSemister } from './interface.academicSemister'
import AcademicSemister from './model.academicSemister'

export const createSemisterService = async (
  semisterData: IAcademicSemister,
): Promise<IAcademicSemister> => {
  const createdSemister = await AcademicSemister.create(semisterData)
  return createdSemister
}
