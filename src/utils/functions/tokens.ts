import { deleteCookie, setCookie} from "./cookies";

const TOKEN = 'token'

export const setTokens = (res:any) => {
    const accessToken = res.accessToken.split('Bearer ')[1]
    const refreshToken = res.refreshToken
    setCookie(TOKEN, accessToken, null)
    localStorage.setItem(TOKEN, refreshToken);
}

export const clearStorage = () => {
    deleteCookie(TOKEN)
    localStorage.removeItem(TOKEN)

}
