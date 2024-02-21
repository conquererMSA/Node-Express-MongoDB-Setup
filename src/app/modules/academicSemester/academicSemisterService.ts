import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemister } from './interface.academicSemister'
import AcademicSemister from './model.academicSemister'
// import { AllPaginationDataType } from '../../../shared/allPaginationDataType'

//check semister title for specific semister code Autumn:'01', Summer:'02', Fall:'03'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const titleCodeMapper: {
  [key: string]: string
} = {
  Autumn: '01',
  Fall: '03',
  Summer: '02',
}
//type for paginationOptions
export type IPaginationOptions = {
  page?: number
  limit?: number
  sortOrder?: string | undefined
  sortBy?: string | undefined
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
//handle get all semisterdata
export const getAllSemisterService = async (
  paginationOptions: IPaginationOptions,
): Promise<IAcademicSemister[]> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { page = 1, limit = 10 } = paginationOptions
  const skip = (page - 1) * limit
  const semisters = await AcademicSemister.find().sort().skip(skip).limit(limit)
  //pagination hole*******
  // const totalDoc = await AcademicSemister.find().sort().countDocuments()
  // return {
  //   // meta: {
  //   //   page: page,
  //   //   limit: limit,
  //   //   totalDoc: totalDoc,
  //   // },
  //   data: semisters,
  // }
  //finished pagination*******
  return semisters
}
