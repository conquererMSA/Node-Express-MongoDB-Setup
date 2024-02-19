import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../../config'
import { autoGenaretedUserId } from './users.utils'
import ApiError from '../../../errors/ApiError'

export const createUserService = async (user: IUser) => {
  //student password
  if (!user.password) {
    user.password = config.default_pass as string
  }
  //auto increamental id
  const id = await autoGenaretedUserId()
  user.id = id
  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failde to create user!')
  }
  return createdUser
}
