export type AllPaginationDataType<T> = {
  //T er type hocce IAcademicSemister type
  meta: {
    page: number
    limit: number
    totalDoc: number
  }
  data: T
}
