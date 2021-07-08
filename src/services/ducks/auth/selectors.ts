import { sliceName } from './slice'
import {RootState} from "../../store/store";

export const getIsTokenUpdated = (store: RootState) => store[sliceName].tokenUpdated
export const getIsTokenUpdating = (store: RootState) => store[sliceName].tokenUpdating
export const getTokenUpdateDate = (store: RootState) => store[sliceName].tokenUpdateDate
export const getIsEmailSent = (store: RootState) => store[sliceName].emailSent

export const getUserSending = (store: RootState) => store[sliceName].getUserSending

export const getProfileData = (store: RootState) => store[sliceName].data

export const getLoginError = (store: RootState) => store[sliceName].loginError
export const getRegisterError = (store: RootState) => store[sliceName].registerError
export const getForgotPasswordError = (store: RootState) => store[sliceName].forgotUserPasswordError
export const getSetUserPasswordError = (store: RootState) => store[sliceName].setUserPasswordError
