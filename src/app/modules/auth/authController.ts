import httpStatus from 'http-status'
import config from '../../../config'
import { catchConAsync } from '../../../shared/catchConAsync'
import { sendConResponse } from '../../../shared/sendResponse'
import { createNewAccessTokenService, loginUserService } from './authService'
import { parseExpiresIn } from './caculateExpiresIn'

export const loginUserCon = catchConAsync(async (req, res) => {
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

export const newAccessTokenCon = catchConAsync(async (req, res) => {
  const newAccessToken = await createNewAccessTokenService(req.cookies)
  sendConResponse(res, {
    statusCode: 200,
    message: 'create new token successfully',
    data: { newAccessToken },
  })
})
