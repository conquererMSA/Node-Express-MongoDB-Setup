import { Schema, model } from 'mongoose'
import status from 'http-status'
import {
  AcademicSemisterModel,
  IAcademicSemister,
} from './interface.academicSemister'
import ApiError from '../../../errors/ApiError'

enum Month {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: {
      type: String,
      required: true,
      enum: ['Autumn', 'Fall', 'Summer'],
    },
    startMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    endMonth: {
      type: String,
      required: true,
      enum: Month,
    },
    code: {
      type: String,
      required: true,
      enum: ['01', '02', '03'],
    },
    year: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
)
//handle same yaer semister by pre-hook
academicSemisterSchema.pre('save', async function (next) {
  const sameSemister = await AcademicSemister.findOne({
    title: this.title,
    year: this.year,
  })
  if (sameSemister) {
    throw new ApiError(status.CONFLICT, 'Same semister is already exist!')
  }
  next()
})
const AcademicSemister = model<IAcademicSemister, AcademicSemisterModel>(
  'AcademicSemister',
  academicSemisterSchema,
)
export default AcademicSemister
