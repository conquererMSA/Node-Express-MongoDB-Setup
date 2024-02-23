import status from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAcademicSemister } from './interface.academicSemister'
import AcademicSemister from './model.academicSemister'
import { paginationPageLimitSkip } from '../../../shared/paginationHelpers'
// import { AllPaginationDataType } from '../../../shared/allPaginationDataType'
import { SortOrder } from 'mongoose'

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
  sortOrder?: SortOrder
  sortBy?: string | undefined
}
//type for filter and search
export type ISearch = {
  searchTerm?: string
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
  searchFiltersObj: ISearch,
  paginationOptions: IPaginationOptions,
): Promise<IAcademicSemister[]> => {
  //manually pagination variable
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit
  //pagination by helpers function
  const { limit, skip, sortBy, sortOrder } =
    paginationPageLimitSkip(paginationOptions)
  //if sortBy and sortOrder exist
  const sortCodition: { [index: string]: SortOrder } = {}
  //sortCondition={createdAt:'desc'}
  //sortCondition={year:'asc'}
  if (sortBy && sortOrder) {
    sortCodition[sortBy] = sortOrder
  }
  //searc and filter
  const { searchTerm, ...filtersData } = searchFiltersObj
  console.log(searchTerm, 'searcTerm in con')
  console.log(filtersData, 'filters data in service file')

  const semisterSearchableFields = ['title', 'code', 'year']
  const searchFiltersCondition = [
    // {},forSeraching ekhabe value hobe partial
    // {} for filtering ekhane value hobe exact match
  ]

  //for dynamic searching
  // const searchFiltersCondition = [
  //   {
  //     $or: [
  //       {
  //       title: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     },
  //     {
  //       code: {
  //         $regex: searchTerm,
  //         $options: 'i',
  //       },
  //     }
  //   ],
  //   },
  // ]

  if (searchTerm) {
    searchFiltersCondition.push({
      $or: semisterSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  //for dynamic filtering
  // if (Object.keys(filtersData).length) {
  //   $and: [
  //     {
  //     title:filtersData.title
  //   },
  //   {
  //     code:filtersData.code
  //   },
  //   {
  //     year:filtersData.year
  //   },
  // ]
  // }
  if (Object.keys(filtersData).length) {
    searchFiltersCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }
  //take decesion for query condition
  const queryCondition =
    searchFiltersCondition.length > 0 ? { $and: searchFiltersCondition } : {}

  const semisters = await AcademicSemister.find(queryCondition)
    .sort(sortCodition)
    .skip(skip)
    .limit(limit)
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

export const getSingleSemisterService = async (id: string) => {
  const singleSemister = await AcademicSemister.findById(id)
  return singleSemister
}
export const updateASemisterService = async (
  id: string,
  updateData: Partial<IAcademicSemister>,
): Promise<IAcademicSemister | null> => {
  if (
    updateData.code &&
    updateData.title &&
    titleCodeMapper[updateData.title] !== updateData.code
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semister title or code')
  }
  const updatedSemister = await AcademicSemister.findOneAndUpdate(
    { _id: id },
    updateData,
    { new: true },
  )
  return updatedSemister
}
export const deleteASemisterService = async (
  id: string,
): Promise<IAcademicSemister | null> => {
  const deletedSemister = await AcademicSemister.findOneAndDelete({ _id: id })
  return deletedSemister
}
