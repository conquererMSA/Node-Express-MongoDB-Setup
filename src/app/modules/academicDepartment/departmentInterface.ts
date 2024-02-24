import { Schema, model } from 'mongoose'
import { Model } from 'mongoose'

export type IDepartment = {
  title: string
  faculty: Schema.Types.ObjectId
}
export type DepartmentModel = Model<IDepartment, Record<string, unknown>>
const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    faculty: {
      type: Schema.Types.ObjectId,
    },
  },
  { timestamps: true },
)
export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  departmentSchema,
)

// {
//   "dept": {
//     "title": "Dept of Practical Mathematics",
//     "faculty":"65d882481a0f7c657cfdd400"
//   }
// }
