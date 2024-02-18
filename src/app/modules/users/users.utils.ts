import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const autoGenaretedUserId = async () => {
  const id = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementId = (parseInt(id) + 1).toString().padStart(5, '0')
  return incrementId
}
