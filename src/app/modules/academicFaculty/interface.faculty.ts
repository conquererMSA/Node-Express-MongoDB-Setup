import { Model, Schema, model } from 'mongoose'

export type IFaculty = {
  title: string
}
export type FacultyModel = Model<IFaculty, Record<string, unknown>>
export const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
)
export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
