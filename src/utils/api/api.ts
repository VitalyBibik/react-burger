import { serverConfig } from '../constants/constants';
import {getCookie} from "../functions/cookies";

export const getProducts = async () => {
    const res = await fetch(`${serverConfig.baseUrl}/ingredients`, {
        method: 'GET',
        headers: serverConfig.headers,
    })
        return requestHandler(res)
}

export const addOrders = async (ingredients:any) => {
    const res = await fetch(`${serverConfig.baseUrl}/orders`, {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify(
            { ingredients }
        )
    })
        return requestHandler(res)
}

export const signUp = async ({ email, password, name }:any) => {
    const res = await fetch(`${serverConfig.baseUrl}/auth/register`, {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify(
            { email, password, name }
        )
    })
        return requestHandler(res)
}

export const signIn = async ({ login, password }:any) => {
    const res = fetch(`${serverConfig.baseUrl}/auth`, {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify(
            { login, password }
        )
    })
        return requestHandler(res)
}

export const forgotPassword = async (value:any) => {
    const res = await fetch(`${serverConfig.baseUrl}/password-reset`, {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify(
            { email: value }
        )
    })
        return requestHandler(res)
}

export const resetPassword = async ({ password, token }:any) => {
    const res = await fetch(`${serverConfig.baseUrl}/password-reset/reset`, {
        method: 'POST',
        headers: serverConfig.headers,
        body: JSON.stringify(
            { password, token }
        )
    })
        return requestHandler(res)
}
export const getUser = async () => {
    const res = await fetch(`${serverConfig.baseUrl}/auth/user`, {
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {...serverConfig.headers,
        Authorization: 'Bearer ' + getCookie('token')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    })
    return requestHandler(res)
}

export const getResetCode = async (email:string) => {
    const res = await fetch(`${serverConfig.baseUrl}/password-reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email,
        }),
    });
    return requestHandler(res)
};

export const logoutRequest = async (refreshToken:string) => {
    return await fetch(`${serverConfig.baseUrl}/auth/logout`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: `${refreshToken}`,
        }),
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    });
};


const requestHandler = async (res:any) => {
    if (res.ok) {
        return await res.json();
    }
        return Promise.reject(res.status)
}
