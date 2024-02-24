import { Faculty, IFaculty } from './interface.faculty'

export const createAFacultyService = async (
  facultyData: IFaculty,
): Promise<IFaculty | null> => {
  const createdFaculty = await Faculty.create(facultyData)
  return createdFaculty
}
export const getAFacultyService = async (
  id: string,
): Promise<IFaculty | null> => {
  const faculty = await Faculty.findById({ _id: id }).populate({
    path: 'depts',
  })
  return faculty
}
export const updateAFacultyService = async (
  id: string,
  faculty: IFaculty,
): Promise<IFaculty | null> => {
  const updatedFaculty = await Faculty.findOneAndUpdate({ _id: id }, faculty, {
    new: true,
  })
  return updatedFaculty
}
export const deleteAFacultyService = async (
  id: string,
): Promise<IFaculty | null> => {
  const faculty = await Faculty.findOneAndDelete({ _id: id })
  return faculty
}
