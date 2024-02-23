import { Model } from 'mongoose'
export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December'
export type IAcademicSemister = {
  title: 'Autumn' | 'Fall' | 'Summer'
  code: '01' | '02' | '03'
  year: string
  startMonth: Month
  endMonth: Month
}

export type AcademicSemisterModel = Model<
  IAcademicSemister,
  Record<string, unknown>
>
