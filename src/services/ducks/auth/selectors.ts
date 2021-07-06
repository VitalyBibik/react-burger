import { sliceName } from './slice';

export const getIsTokenUpdated = (store: any) => store[sliceName].tokenUpdated;
export const getIsTokenUpdating = (store: any) =>
  store[sliceName].tokenUpdating;
export const getTokenUpdateDate = (store: any) =>
  store[sliceName].tokenUpdateDate;
export const getIsEmailSent = (store: any) => store[sliceName].emailSent;

export const getUserSending = (store: any) => store[sliceName].getUserSending;

export const getProfileData = (store: any) => store[sliceName].data;

export const getLoginError = (store: any) => store[sliceName].loginError;
export const getRegisterError = (store: any) => store[sliceName].registerError;
export const getForgotPasswordError = (store: any) =>
  store[sliceName].forgotUserPasswordError;
export const getSetUserPasswordError = (store: any) =>
  store[sliceName].setUserPasswordError;
