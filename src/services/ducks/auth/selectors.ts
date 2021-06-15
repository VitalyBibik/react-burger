import { sliceName } from './slice';

export const getIsTokenUpdated = (store: any) => store[sliceName].tokenUpdated;
export const getTokenUpdateDate = (store: any) =>
  store[sliceName].tokenUpdateDate;
export const getIsEmailSent = (store: any) => store[sliceName].emailSent;

export const getUserSending = (store: any) => store[sliceName].getUserSending;

export const getProfileData = (store: any) => store[sliceName].data;
