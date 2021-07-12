import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from '@reduxjs/toolkit'
import {
  forgotFetchPassword,
  getAccessToken,
  getFetchUser,
  logoutFetchRequest,
  setFetchPassword,
  setFetchUserData,
  signInFetch,
  signUpFetch,
} from '../../../utils/api/api'
import { push } from 'connected-react-router'
import { ROUTES } from '../../../utils/routes/routes'
import { clearStorage, setTokens } from '../../../utils/functions/tokens'
import { AppDispatch } from '../../store/store'

export const sliceName = 'authReducer'

export interface IAuthState {
  data: TuserData
  tokens: TRefreshFetch | null
  registerSending: boolean
  registerError: SerializedError | null
  loginSending: boolean
  loginError: SerializedError | null
  getUserSending: boolean
  getUserError: SerializedError | null
  setUserPasswordSending: boolean
  setUserPasswordError: SerializedError | null
  forgotUserPasswordSending: boolean
  forgotUserPasswordError: SerializedError | null
  tokenUpdated: boolean
  tokenUpdateDate: null | boolean
  tokenUpdating: boolean
  tokenUpdateError: null | SerializedError
  emailSent: boolean
  patchUserSending: boolean
  patchUserError: null | SerializedError
  signOutSending: boolean
  signOutError: null | SerializedError
}
const initialState: IAuthState = {
  data: { user: { email: 'user@mail.ru', name: 'user' } },
  tokens: null,
  registerSending: false,
  registerError: null,
  loginSending: false,
  loginError: null,
  getUserSending: false,
  getUserError: null,
  setUserPasswordSending: false,
  setUserPasswordError: null,
  forgotUserPasswordSending: false,
  forgotUserPasswordError: null,
  tokenUpdated: false,
  tokenUpdating: false,
  tokenUpdateDate: null,
  tokenUpdateError: null,
  emailSent: false,
  patchUserSending: false,
  patchUserError: null,
  signOutSending: false,
  signOutError: null,
}
type TUser = {
  accessToken: string
  refreshToken: string
  success: boolean
  user: { email: string; name: string }
}
type TRefreshFetch = {
  accessToken: string
  refreshToken: string
  success: boolean
}

type TuserData = {
  user: { email: string; name: string }
}

type TForgotUserPassword = {
  success: boolean
  message: string
}
export interface ISignUpFetch {
  email: string
  password: string
  name: string
}
export interface ISignInFetch {
  login: string
  password: string
}
export interface ISetFetchUserData {
  name?: string
  email?: string
  password?: string
  token?: string
}

export const registerUser = createAsyncThunk<
  TUser,
  ISignUpFetch,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/registerUser`, async (registerData, { dispatch }) => {
  const res = await signUpFetch(registerData)
  setTokens(res)
  dispatch(push(`${ROUTES.MAIN}`))
  return res
})

export const loginUser = createAsyncThunk<
  TUser,
  ISignInFetch,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/loginUser`, async (loginData, { dispatch }) => {
  const res = await signInFetch(loginData)
  setTokens(res)
  dispatch(push(`${ROUTES.MAIN}`))
  return res
})

export const patchUser = createAsyncThunk<
  TUser,
  ISetFetchUserData,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/patchUser`, async (changeData, { dispatch, rejectWithValue }) => {
  try {
    return await setFetchUserData(changeData)
  } catch (e) {
    if (e.message === 'jwt expired') {
      dispatch(refreshToken(setUserPassword(changeData)))
    }
    return rejectWithValue(e)
  }
})

export const refreshToken = createAsyncThunk<TUser, any, {}>(`${sliceName}/refreshToken`, async (afterRefresh, { dispatch }) => {
  const res = await getAccessToken() // Рефреш токен берется внутри запроса
  setTokens(res)
  if (afterRefresh !== null) {
    dispatch(await afterRefresh)
    return res
  }
  return res
})
export const getUser = createAsyncThunk<
  TUser,
  void,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/getUser`, async (_, { dispatch, rejectWithValue }) => {
  try {
    return await getFetchUser()
  } catch (e) {
    rejectWithValue(e)
    if (e.message === 'jwt expired') {
      dispatch(refreshToken(getUser())) // Перенаправляю экшен в обновление токена, если истек токен
    } else {
      dispatch(push(`${ROUTES.LOGIN}`))
    }
  }
})

export const setUserPassword = createAsyncThunk<
  TForgotUserPassword,
  ISetFetchUserData,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/resetUserPassword`, async (changeData, { dispatch }) => {
  const res = await setFetchPassword(changeData)
  dispatch(push(`${ROUTES.LOGIN}`))
  return res
})

export const forgotUserPassword = createAsyncThunk<
  TForgotUserPassword,
  string,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/forgotUserPassword`, async (changeData, { dispatch }) => {
  const res = await forgotFetchPassword(changeData)
  dispatch(push(`${ROUTES.RESET_PASSWORD}`))
  return res
})

export const signOut = createAsyncThunk<
  Response,
  string,
  {
    dispatch: AppDispatch
    state: IAuthState
  }
>(`${sliceName}/signOut`, async (refreshToken, { dispatch }) => {
  const res = await logoutFetchRequest(refreshToken)
  dispatch(setUserData({ user: { email: 'user@mail.ru', name: 'user' } }))
  clearStorage()
  return res
})

const authSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setUserData(state: IAuthState, action: PayloadAction<TuserData>) {
      state.data = action.payload
    },
    resetError(state: IAuthState) {
      state.registerError = null
      state.loginError = null
      state.getUserError = null
      state.setUserPasswordError = null
      state.forgotUserPasswordError = null
      state.tokenUpdateError = null
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUser.pending, (state: IAuthState) => {
      state.registerSending = true
    })
    builder.addCase(registerUser.fulfilled, (state: IAuthState, action: PayloadAction<TuserData>) => {
      state.registerSending = false
      state.registerError = null
      state.data = action.payload
      state.tokenUpdated = true
      state.tokenUpdateDate = true
    })
    builder.addCase(registerUser.rejected, (state: IAuthState, action) => {
      state.registerSending = false
      state.registerError = action.error
    })
    builder.addCase(loginUser.pending, (state: IAuthState) => {
      state.loginSending = true
    })
    builder.addCase(loginUser.fulfilled, (state: IAuthState, action: PayloadAction<TuserData>) => {
      state.loginSending = false
      state.loginError = null
      state.data = action.payload
      state.tokenUpdated = true
      state.tokenUpdateDate = true
    })
    builder.addCase(loginUser.rejected, (state: IAuthState, action) => {
      state.loginSending = false
      state.loginError = action.error
    })
    builder.addCase(getUser.pending, (state: IAuthState) => {
      state.getUserSending = true
    })
    builder.addCase(getUser.fulfilled, (state: IAuthState, action: PayloadAction<TuserData>) => {
      state.getUserSending = false
      state.getUserError = null
      state.data = action.payload
    })
    builder.addCase(getUser.rejected, (state: IAuthState, action) => {
      state.getUserSending = false
      state.getUserError = action.error
    })
    builder.addCase(setUserPassword.pending, (state: IAuthState) => {
      state.setUserPasswordSending = true
    })
    builder.addCase(setUserPassword.fulfilled, (state: IAuthState) => {
      state.setUserPasswordSending = false
      state.setUserPasswordError = null
    })
    builder.addCase(setUserPassword.rejected, (state: IAuthState, action) => {
      state.setUserPasswordSending = false
      state.setUserPasswordError = action.error
    })
    builder.addCase(forgotUserPassword.pending, (state: IAuthState) => {
      state.forgotUserPasswordSending = true
    })
    builder.addCase(forgotUserPassword.fulfilled, (state: IAuthState) => {
      state.forgotUserPasswordSending = false
      state.forgotUserPasswordError = null
      state.emailSent = true
    })
    builder.addCase(forgotUserPassword.rejected, (state: IAuthState, action) => {
      state.forgotUserPasswordSending = false
      state.forgotUserPasswordError = action.error
    })
    builder.addCase(signOut.pending, (state: IAuthState) => {
      state.signOutSending = true
    })
    builder.addCase(signOut.fulfilled, (state: IAuthState) => {
      state.signOutSending = false
      state.signOutError = null
      state.tokenUpdated = false
      state.tokenUpdateDate = null
    })
    builder.addCase(signOut.rejected, (state: IAuthState, action) => {
      state.signOutSending = false
      state.signOutError = action.error
    })
    builder.addCase(refreshToken.pending, (state: IAuthState) => {
      state.tokenUpdated = false
      state.tokenUpdating = true
    })
    builder.addCase(refreshToken.fulfilled, (state: IAuthState, action: PayloadAction<TRefreshFetch>) => {
      state.tokenUpdated = true
      state.tokenUpdateDate = true
      state.tokenUpdating = false
      state.tokens = action.payload
    })
    builder.addCase(refreshToken.rejected, (state: IAuthState, action) => {
      state.tokenUpdated = true
      state.tokenUpdateDate = false
      state.tokenUpdateError = action.error
      clearStorage()
    })
    builder.addCase(patchUser.pending, (state: IAuthState) => {
      state.patchUserSending = true
    })
    builder.addCase(patchUser.fulfilled, (state: IAuthState, action: PayloadAction<TuserData>) => {
      state.patchUserSending = false
      state.data = action.payload
    })
    builder.addCase(patchUser.rejected, (state: IAuthState, action) => {
      state.patchUserSending = false
      state.patchUserError = action.error
    })
  },
})

export const { setUserData, resetError } = authSlice.actions
export const authReducer = authSlice.reducer
