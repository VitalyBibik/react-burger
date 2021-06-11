import { setCookie } from "./cookies";

export const setTokens = (res:any) => {
    const accessToken = res.accessToken.split('Bearer ')[1]
    const refreshToken = res.refreshToken
    setCookie('token', accessToken, null)
    localStorage.setItem('token', refreshToken);
}
