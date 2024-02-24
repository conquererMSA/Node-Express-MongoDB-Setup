import { Department, IDepartment } from './departmentInterface'

export const createADeptService = async (
  department: IDepartment,
): Promise<IDepartment | null> => {
  const createdDepartment = await Department.create(department)
  return createdDepartment
}
export const getADeptService = async (
  id: string,
): Promise<IDepartment | null> => {
  const dept = await Department.findById({ _id: id })
  return dept
}
export const updateADeptService = async (
  id: string,
  faculty: IDepartment,
): Promise<IDepartment | null> => {
  const updatedDept = await Department.findOneAndUpdate({ _id: id }, faculty, {
    new: true,
  })
  return updatedDept
}
export const deleteADeptService = async (
  id: string,
): Promise<IDepartment | null> => {
  const dept = await Department.findOneAndDelete({ _id: id })
  return dept
}
