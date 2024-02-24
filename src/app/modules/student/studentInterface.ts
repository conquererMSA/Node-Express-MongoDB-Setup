import { Model, Types } from 'mongoose'
import { IAcademicSemister } from '../academicSemester/interface.academicSemister'
import { IDepartment } from '../academicDepartment/departmentInterface'
import { IFaculty } from '../academicFaculty/interface.faculty'

export type TUserName = {
  [index: string]: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherName: string
  motherOccupation: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  userId: string
  name: TUserName
  gender: 'male' | 'female' | 'other'
  dateOfBirth?: Date
  email: string
  contactNo: string
  emergencyContactNo: string
  bloogGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  profileImg?: string
  semisterId: Types.ObjectId | IAcademicSemister
  departmentId: Types.ObjectId | IDepartment
  facultyId: Types.ObjectId | IFaculty
}

export type IStudentFilters = {
  searchTerm: string
  id: string
  contactNo: string
  emergencyContactNo: string
  bloodGroup: string
  email: string
  userId: string
}

//for creating static
export type StudentModel = {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TStudent | null>
} & Model<TStudent>
