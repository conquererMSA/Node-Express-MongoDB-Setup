import { Faculty, IFaculty } from './interface.faculty'

export const createAFacultyService = async (facultyData: IFaculty) => {
  const createdFaculty = await Faculty.create(facultyData)
  return createdFaculty
}
