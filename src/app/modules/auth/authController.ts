import httpStatus from 'http-status'
import config from '../../../config'
import { catchConAsync } from '../../../shared/catchConAsync'
import { sendConResponse } from '../../../shared/sendResponse'
import {
  changePasswordService,
  createNewAccessTokenService,
  loginUserService,
} from './authService'
import { parseExpiresIn } from './caculateExpiresIn'
import { RequestHandler } from 'express'
import { JwtPayload } from 'jsonwebtoken'

export const loginUserCon: RequestHandler = catchConAsync(async (req, res) => {
  const tokens = await loginUserService(req.body.id, req.body.loginPass)
  const { refreshToken, accessToken, needsPassChanged } = tokens
  const expiresInString = config.jwt.refresh_expires_in
  if (!expiresInString) {
    throw new Error(
      'Refresh token expiration duration is not defined in config',
    )
  }
  //get expiresIn as number from parseExpiresIn util function
  const expiresIn = parseExpiresIn(expiresInString)
  //set refresh token in browser cookie by refreshToken name
  res.cookie('refrshToken', refreshToken, {
    maxAge: expiresIn * 1000,
    httpOnly: true,
    secure: config.env === 'production',
    sameSite: 'strict',
  })
  if ('refreshToken' in tokens) delete tokens['refreshToken']
  sendConResponse(res, {
    statusCode: httpStatus.OK,
    message: 'login successfully',
    data: { accessToken, needsPassChanged },
  })
})

export const newAccessTokenCon: RequestHandler = catchConAsync(
  async (req, res) => {
    const newAccessToken = await createNewAccessTokenService(req.cookies)
    sendConResponse(res, {
      statusCode: 200,
      message: 'create new token successfully',
      data: { newAccessToken },
    })
  },
)
export const changePassCon: RequestHandler = catchConAsync(async (req, res) => {
  const data = await changePasswordService(
    req.body?.oldPass,
    req.body?.newPass,
    req.verifiedUser as JwtPayload,
  )
  sendConResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Password chaned successfully',
    data: data,
  })
})
