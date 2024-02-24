import { Model, Schema, model } from 'mongoose'

export type IFaculty = {
  title: string
  depts?: Schema.Types.ObjectId
}
export type FacultyModel = Model<IFaculty, Record<string, unknown>>
export const facultySchema = new Schema<IFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    depts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Department',
      },
    ],
  },
  { timestamps: true },
)
//handle same faculty duplication
facultySchema.index({ title: 1 }, { unique: true })
export const Faculty = model<IFaculty, FacultyModel>('Faculty', facultySchema)
