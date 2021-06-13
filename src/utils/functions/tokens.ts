import { deleteCookie, setCookie } from './cookies';

const TOKEN = 'token';

export const setTokens = (res: any) => {
  const accessToken = res.accessToken.split('Bearer ')[1];
  const refreshToken = res.refreshToken;
  setCookie(TOKEN, accessToken, null);
  localStorage.setItem(TOKEN, refreshToken);
};

export const clearStorage = () => {
  deleteCookie(TOKEN);
  localStorage.removeItem(TOKEN);
};
export const getRefreshToken = () => {
  return localStorage.getItem(TOKEN);
};

/*
  try {
            const res = await setFetchPassword(changeData)
            dispatch(push(`${ROUTES.LOGIN}`))
            return res;
        }
        catch (e) {
            if (e.message === "jwt expired") {
                dispatch(refreshToken(setUserPassword))
            }
        }
 */
