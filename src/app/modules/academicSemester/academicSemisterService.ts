import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemister } from './interface.academicSemister'
import AcademicSemister from './model.academicSemister'

//check semister title for specific semister code Autumn:'01', Summer:'02', Fall:'03'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const titleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Fall: '03',
  Summer: '02',
}
export const createSemisterService = async (
  semisterData: IAcademicSemister,
): Promise<IAcademicSemister> => {
  //check title for specific code here
  if (titleCodeMapper[semisterData.title] !== semisterData.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semister title and code')
  }
  const createdSemister = await AcademicSemister.create(semisterData)
  return createdSemister
}
