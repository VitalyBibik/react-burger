import { sliceName } from './slice';

export const getIsTokenUpdated = (store: any) => store[sliceName].tokenUpdated;
export const getTokenUpdateDate = (store: any) =>
  store[sliceName].tokenUpdateDate;
export const getIsEmailSent = (store: any) => store[sliceName].emailSent;
