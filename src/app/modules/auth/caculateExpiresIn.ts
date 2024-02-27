export const parseExpiresIn = (expiresInString: string): number => {
  const regex = /^(\d+)([smhd])$/
  const matches = regex.exec(expiresInString)
  if (!matches) {
    throw new Error('Invalid refresh token expiration duration format')
  }
  const value = parseInt(matches[1])
  const unit = matches[2]
  switch (unit) {
    case 's':
      return value
    case 'm':
      return value * 60
    case 'h':
      return value * 60 * 60
    case 'd':
      return value * 60 * 60 * 24
    default:
      throw new Error('Invalid refresh token expiration duration unit')
  }
}
