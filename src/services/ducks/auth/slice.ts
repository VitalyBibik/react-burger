import {
    createAsyncThunk,
    createSlice,
    PayloadAction,
    SerializedError,
} from '@reduxjs/toolkit';
import {
    forgotFetchPassword, getAccessToken,
    getFetchUser,
    logoutFetchRequest,
    setFetchPassword,
    setFetchUserData,
    signInFetch,
    signUpFetch,
} from '../../../utils/api/api';
import { push } from 'connected-react-router';
import { ROUTES } from '../../../utils/routes/routes';
import {clearStorage, getRefreshToken, setTokens} from '../../../utils/functions/tokens';

export const sliceName = 'authReducer';

interface AuthState {
    data: any | null;
    registerSending: boolean;
    registerError: SerializedError | null;
    loginSending: boolean;
    loginError: SerializedError | null;
    getUserSending: boolean;
    getUserError: SerializedError | null;
    setUserPasswordSending: boolean;
    setUserPasswordError: SerializedError | null;
    forgotUserPasswordSending: boolean;
    forgotUserPasswordError: SerializedError | null;
    deleteRefreshTokenSending: boolean;
    deleteRefreshTokenError: SerializedError | null;
    tokenUpdated: boolean;
    tokenUpdateDate: null | SerializedError | boolean;
}
const initialState: AuthState = {
    data: null,
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
    deleteRefreshTokenSending: false,
    deleteRefreshTokenError: null,
    tokenUpdated: false,
    tokenUpdateDate: null,
};

export const registerUser = createAsyncThunk<any, any, any>(
    `${sliceName}/registerUser`,
    async (registerData, { dispatch }) => {
        const res = await signUpFetch(registerData);
        setTokens(res);
        dispatch(setUserData(res));
        dispatch(push(`${ROUTES.MAIN}`));
        return registerData;
    }
);

export const loginUser = createAsyncThunk<any, any, any>(
    `${sliceName}/loginUser`,
    async (loginData, { dispatch }) => {
        const res = await signInFetch(loginData);
        setTokens(res);
        dispatch(setUserData(res));
        dispatch(push(`${ROUTES.MAIN}`));
        return loginData;
    }
);

export const patchUser = createAsyncThunk<any, any, any>(
    `${sliceName}/patchUser`,
    async (changeData, { dispatch, rejectWithValue }) => {
        try {
            const res = await setFetchUserData(changeData);
            dispatch(setUserData(res));
            return changeData;
        } catch (e) {
            if (e.message === 'jwt expired') {
                await dispatch(refreshToken(setUserPassword(changeData)));
            } else {
                rejectWithValue(e);
            }
        }
    }
);
export const getUser = createAsyncThunk<any, any, any>(
    `${sliceName}/getUser`,
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const res = await getFetchUser();
            //dispatch(setUserData(res));
            console.log('getUser', res)
            return res
        } catch (e) {
            if (e.message === 'jwt expired') {
                // console.log(getRefreshToken(), 'REFRESHtOKEN')
                // const res = dispatch(await getAccessToken());
                //    setTokens(res)
                dispatch(refreshToken(getUser(null))) // Перенаправляю экшен в обновление токена, если истек токен
            } else {
                dispatch(push(`${ROUTES.LOGIN}`));
                rejectWithValue(e);
            }
        }
    }
);

export const setUserPassword = createAsyncThunk<any, any, any>(
    `${sliceName}/resetUserPassword`,
    async (changeData, { dispatch }) => {
        const res = await setFetchPassword(changeData);
        dispatch(push(`${ROUTES.LOGIN}`));
        return res;
    }
);
export const refreshToken = createAsyncThunk<any, any, any>(
    `${sliceName}/refreshToken`,
    async (afterRefresh, { dispatch }) => {
        const res = await getAccessToken(); // Рефреш токен берется внутри запроса
        setTokens(res); // Записываю новые токены
        if (afterRefresh !== null) { // Если есть диспатч, то диспатчу это событе снова.
            dispatch(afterRefresh);
            return res;
        }
    }
);

export const forgotUserPassword = createAsyncThunk<any, any, any>(
    `${sliceName}/forgotUserPassword`,
    async (changeData, { dispatch }) => {
        const res = await forgotFetchPassword(changeData);
        dispatch(push(`${ROUTES.RESET_PASSWORD}`));
        return res;
    }
);

export const signOut = createAsyncThunk<any, any, any>(
    `${sliceName}/signOut`,
    async (refreshToken, { dispatch }) => {
        const res = await logoutFetchRequest(refreshToken);
        dispatch(push(`${ROUTES.MAIN}`));
        dispatch(setUserData(null));
        clearStorage();
        return res;
    }
);

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setUserData(state: AuthState, action: PayloadAction<any>) {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state: AuthState) => {
            state.registerSending = true;
        });
        builder.addCase(
            registerUser.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.registerSending = false;
                state.registerError = null;
                state.data = action.payload.user;
            }
        );
        builder.addCase(registerUser.rejected, (state: AuthState, action: any) => {
            state.registerSending = false;
            state.registerError = action.error;
        });
        builder.addCase(loginUser.pending, (state: AuthState) => {
            state.loginSending = true;
        });
        builder.addCase(
            loginUser.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.loginSending = false;
                state.loginError = null;
                state.data = action.payload.user;
            }
        );
        builder.addCase(loginUser.rejected, (state: AuthState, action: any) => {
            state.loginSending = false;
            state.loginError = action.error;
        });
        builder.addCase(getUser.pending, (state: AuthState) => {
            state.getUserSending = true;
        });
        builder.addCase(
            getUser.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.getUserSending = false;
                state.getUserError = null;
                state.data = action.payload.user;
            }
        );
        builder.addCase(getUser.rejected, (state: AuthState, action: any) => {
            state.getUserSending = false;
            state.getUserError = action.error;
        });
        builder.addCase(setUserPassword.pending, (state: AuthState) => {
            state.setUserPasswordSending = true;
        });
        builder.addCase(
            setUserPassword.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.setUserPasswordSending = false;
                state.setUserPasswordError = null;
            }
        );
        builder.addCase(
            setUserPassword.rejected,
            (state: AuthState, action: any) => {
                state.setUserPasswordSending = false;
                state.setUserPasswordError = action.error;
            }
        );
        builder.addCase(forgotUserPassword.pending, (state: AuthState) => {
            state.forgotUserPasswordSending = true;
        });
        builder.addCase(
            forgotUserPassword.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.forgotUserPasswordSending = false;
                state.forgotUserPasswordError = null;
            }
        );
        builder.addCase(
            forgotUserPassword.rejected,
            (state: AuthState, action: any) => {
                state.forgotUserPasswordSending = false;
                state.forgotUserPasswordError = action.error;
            }
        );
        builder.addCase(signOut.pending, (state: AuthState) => {
            state.forgotUserPasswordSending = true;
        });
        builder.addCase(
            signOut.fulfilled,
            (state: AuthState, action: PayloadAction<any>) => {
                state.forgotUserPasswordSending = false;
                state.forgotUserPasswordError = null;
            }
        );
        builder.addCase(signOut.rejected, (state: AuthState, action: any) => {
            state.forgotUserPasswordSending = false;
            state.forgotUserPasswordError = action.error;
        });
        builder.addCase(refreshToken.pending, (state:AuthState) => {
            state.tokenUpdated = false;
        });
        builder.addCase(refreshToken.fulfilled, (state:AuthState, action:any) => {
            state.tokenUpdated = true;
            state.tokenUpdateDate = true
            state.data = action.payload;
        });
        builder.addCase(refreshToken.rejected, (state:AuthState, action) => {
            console.log(action.error)
            state.tokenUpdated = true;
            state.tokenUpdateDate = false;
        });
    },
});

export const { setUserData } = authSlice.actions;
export const authReducer = authSlice.reducer;
