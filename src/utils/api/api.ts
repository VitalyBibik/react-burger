import { serverConfig } from '../constants/constants'
import { getCookie } from '../functions/cookies'
import { getRefreshToken } from '../functions/tokens'
import { Ingredient } from '../../services/ducks/constructor'
import { ISetFetchUserData, ISignUpFetch } from '../../services/ducks/auth'

export const getProductsFetch = async () => {
  const res = await fetch(`${serverConfig.baseUrl}/ingredients`, {
    method: 'GET',
    headers: serverConfig.headers,
  })
  return requestHandler(res)
}

export const addOrdersFetch1 = async (ingredients: Array<Ingredient>) => {
  const res = await fetch(`${serverConfig.baseUrl}/orders`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({ ingredients }),
  })
  return requestHandler(res)
}

export const signUpFetch = async ({ email, password, name }: ISignUpFetch) => {
  const res = await fetch(`${serverConfig.baseUrl}/auth/register`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({ email, password, name }),
  })
  return requestHandler(res)
}
type TsignInFetch = {
  login: string
  password: string
}

export const signInFetch = async ({ login, password }: TsignInFetch) => {
  const res = await fetch(`${serverConfig.baseUrl}/auth/login`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({ email: login, password }),
  })
  return requestHandler(res)
}

export const forgotFetchPassword = async (value: string) => {
  const res = await fetch(`${serverConfig.baseUrl}/password-reset`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({ email: value }),
  })
  return requestHandler(res)
}

export const setFetchPassword = async ({ password, token }: ISetFetchUserData) => {
  const res = await fetch(`${serverConfig.baseUrl}/password-reset/reset`, {
    method: 'POST',
    headers: serverConfig.headers,
    body: JSON.stringify({ password, token }),
  })
  return requestHandler(res)
}

export const getFetchUser = async () => {
  const res = await fetch(`${serverConfig.baseUrl}/auth/user`, {
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...serverConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  return requestHandler(res)
}

export const setFetchUserData = async ({ name, email }: ISetFetchUserData) => {
  const res = await fetch(`${serverConfig.baseUrl}/auth/user`, {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      ...serverConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({ name, email }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
  return requestHandler(res)
}

export const logoutFetchRequest = async (refreshToken: string) => {
  return await fetch(`${serverConfig.baseUrl}/auth/logout`, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { ...serverConfig.headers },
    body: JSON.stringify({
      token: `${refreshToken}`,
    }),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  })
}

export const getAccessToken = async () => {
  const res = await fetch(`${serverConfig.baseUrl}/auth/token`, {
    method: 'POST',
    headers: { ...serverConfig.headers },
    body: JSON.stringify({
      token: `${getRefreshToken()}`,
    }),
  })
  return requestHandler(res)
}

export const fetchOrder = async (data: Array<Ingredient | null>) => {
  const res = await fetch(`${serverConfig.baseUrl}/orders`, {
    method: 'POST',
    headers: {
      ...serverConfig.headers,
      Authorization: 'Bearer ' + getCookie('token'),
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  })
  return requestHandler(res)
}
export const loadFetchIngredients = async () => {
  const res = await fetch(`${serverConfig.baseUrl}/ingredients`)
  return requestHandler(res)
}

const requestHandler = (res: any) => {
  if (res.ok) return res.json()
  if (res.json) return res.json().then((err: any) => Promise.reject(err))
  return Promise.reject(res)
}
