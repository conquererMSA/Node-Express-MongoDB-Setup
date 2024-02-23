import { SortOrder } from 'mongoose'

type PaginationType = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
}

type PaginationReturnType = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
}
export const paginationPageLimitSkip = (
  paginationObj: PaginationType,
): PaginationReturnType => {
  const page = Number(paginationObj.page || 1)
  const limit = Number(paginationObj.limit || 10)
  const skip = (page - 1) * limit
  const sortBy = paginationObj.sortBy || 'createdAt'
  const sortOrder = paginationObj.sortOrder || 'desc'
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  }
}
