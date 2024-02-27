import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../users/users.model'
import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import config from '../../../config'
import { LoginUserResponse } from '../users/users.interface'

export const loginUserService = async (
  id: string,
  loginPass: string,
): Promise<LoginUserResponse> => {
  const user = new User()
  const userData = await user.isUserExist(id)
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  if (
    userData?.password &&
    !(await user.isPasswordMatch(loginPass, userData?.password))
  ) {
    // Handle incorrect password
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect password')
  }
  //.env file e SECRET code zodi na thake
  //   if (!config.jwt.secret) {
  //     throw new ApiError(httpStatus.NOT_FOUND, 'JWT Secret does not include')
  //   }
  const accessToken = jwt.sign(
    { id: userData.id, role: userData.role, password: userData.password },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in },
  )
  const refreshToken = jwt.sign(
    { id: userData.id, role: userData.role, password: userData.password },
    config.jwt.refresh_secret as Secret,
    { expiresIn: config.jwt.refresh_expires_in },
  )
  return {
    accessToken,
    refreshToken,
    needsPassChanged: userData?.needsPassChanged,
  }
}

export const createNewAccessTokenService = async (token: string) => {
  const user = new User()
  let verifiedToken
  //verify refresh token and expiresIn time
  try {
    verifiedToken = jwt.verify(
      token,
      config.jwt.refresh_secret as Secret,
    ) as JwtPayload
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token')
  }
  //check user deleted or not
  const { id } = verifiedToken
  const userData = await user.isUserExist(id)
  if (!userData?.id) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }
  const newAccessToken = jwt.sign(
    { id: userData.id, role: userData.role, password: userData.password },
    config.jwt.secret as Secret,
    { expiresIn: config.jwt.expires_in },
  )
  return newAccessToken
}
