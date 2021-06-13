import { sliceName } from './slice';

export const getIsAuth = (store: any) => !!store[sliceName].data;
export const getUserData = (store: any) => store[sliceName].data;
export const getIsAuthChecking = (store: any) => store[sliceName].authChecking;
export const getRegisterSending = (store: any) =>
  store[sliceName].registerSending;
export const getRegisterError = (store: any) => store[sliceName].registerError;
export const getLoginSending = (store: any) => store[sliceName].loginSending;
export const getLoginError = (store: any) => store[sliceName].loginError;
