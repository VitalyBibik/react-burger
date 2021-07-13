import { deleteCookie, setCookie } from './cookies'

const TOKEN = 'token'

export const setTokens = (res: { accessToken: string; refreshToken: string }) => {
  const accessToken = res.accessToken.split('Bearer ')[1]
  const refreshToken = res.refreshToken
  setCookie(TOKEN, accessToken)
  localStorage.setItem(TOKEN, refreshToken)
}

export const clearStorage = () => {
  deleteCookie(TOKEN)
  localStorage.removeItem(TOKEN)
}

export const getRefreshToken = () => {
  return localStorage.getItem(TOKEN)
}
