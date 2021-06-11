import { createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import {
    forgotFetchPassword,
    getFetchUser,
    setFetchPassword,
    setFetchUserData,
    signInFetch,
    signUpFetch
} from '../../../utils/api/api'
import { setCookie } from "../../../utils/functions/cookies";
import { push } from "connected-react-router";
import { ROUTES } from "../../../utils/routes/routes";
import {setTokens} from "../../../utils/functions/setTokens";

export const sliceName = "auth";

export const registerUser = createAsyncThunk<any, any, any>(
    `${sliceName}/registerUser`,
    async (registerData, { dispatch  }) => {
        const res = await signUpFetch(registerData)
        setTokens(res)
        dispatch(setUserData(res))
        dispatch(push(`${ROUTES.MAIN}`));
        return registerData;
    }
);

export const loginUser = createAsyncThunk<any, any, any>(
    `${sliceName}/loginUser`,
    async (loginData, { dispatch}) => {
        const res = await signInFetch(loginData)
        setTokens(res)
        dispatch(setUserData(res))
        dispatch(push(`${ROUTES.MAIN}`));
        return loginData;
    }
);

export const patchUser = createAsyncThunk<any, any, any>(
    `${sliceName}/patchUser`,
    async (changeData, { dispatch}) => {
        const res = await setFetchUserData(changeData)
        dispatch(setUserData(res))
        return changeData;
    }
);
export const getUser = createAsyncThunk<any, any, any>(
    `${sliceName}/getUser`,
    async (_, {dispatch}) => {
        const res = await getFetchUser()
        dispatch(setUserData(res))
        return res;
    }
);


export const setUserPassword = createAsyncThunk<any, any, any>(
    `${sliceName}/resetUserPassword`,
    async (changeData, {dispatch}) => {
        const res = await setFetchPassword(changeData)
        dispatch(push(`${ROUTES.LOGIN}`))
        return res;
    }
);

export const forgotUserPassword = createAsyncThunk<any, any, any>(
    `${sliceName}/forgotUserPassword`,
    async (changeData, {dispatch}) => {
        const res = await forgotFetchPassword(changeData)
        dispatch(push(`${ROUTES.RESET_PASSWORD}`))
        return res;
    }
);


export const signOut = () => (dispatch:any) => {
    dispatch(setUserData(null));
    localStorage.removeItem("jwt");
};

interface AuthState {
    data: any | null;
    authChecking: boolean;
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

}

const initialState: AuthState = {
    data: null,
    authChecking: true,
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
};

const authSlice = createSlice({
    name: sliceName,
    initialState,
    reducers: {
        setUserData(state:AuthState, action: PayloadAction<any>) {
            state.data = action.payload;
        },
    },
    extraReducers: builder => {
        builder.addCase(registerUser.pending, (state:AuthState) => {
            state.registerSending = true;
        });
        builder.addCase(registerUser.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.registerSending = false;
            state.registerError = null;
            state.data = action.payload.user
        });
        builder.addCase(registerUser.rejected, (state:AuthState, action:any) => {
            state.registerSending = false;
            state.registerError = action.error;
        });
        builder.addCase(loginUser.pending, (state:AuthState) => {
            state.loginSending = true;
        });
        builder.addCase(loginUser.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.loginSending = false;
            state.loginError = null;
            state.data = action.payload.user
        });
        builder.addCase(loginUser.rejected, (state:AuthState, action:any) => {
            state.loginSending = false;
            state.loginError = action.error;
        });
        builder.addCase(getUser.pending, (state:AuthState) => {
            state.getUserSending = true;
        });
        builder.addCase(getUser.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.getUserSending = false;
            state.getUserError = null;
            console.log('PoluchilUsera', action.payload)
            state.data = action.payload.user
        });
        builder.addCase(getUser.rejected, (state:AuthState, action:any) => {
            state.getUserSending = false;
            state.getUserError = action.error;
        });
        builder.addCase(setUserPassword.pending, (state:AuthState) => {
            state.setUserPasswordSending = true;
        });
        builder.addCase(setUserPassword.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.setUserPasswordSending = false;
            state.setUserPasswordError = null;
        });
        builder.addCase(setUserPassword.rejected, (state:AuthState, action:any) => {
            state.setUserPasswordSending = false;
            state.setUserPasswordError = action.error;
        });
        builder.addCase(forgotUserPassword.pending, (state:AuthState) => {
            state.forgotUserPasswordSending = true;
        });
        builder.addCase(forgotUserPassword.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.forgotUserPasswordSending = false;
            state.forgotUserPasswordError = null;
        });
        builder.addCase(forgotUserPassword.rejected, (state:AuthState, action:any) => {
            state.forgotUserPasswordSending = false;
            state.forgotUserPasswordError = action.error;
        });


        // builder.addCase(checkAuth.pending, (state:AuthState) => {
        //     state.authChecking = true;
        // });
        // builder.addCase(checkAuth.fulfilled, (state:AuthState, action:any) => {
        //     state.authChecking = false;
        //     state.data = action.payload;
        // });
        // builder.addCase(checkAuth.rejected, (state:AuthState) => {
        //     state.authChecking = false;
        // });

    },
});



export const { setUserData } = authSlice.actions
export const authReducer = authSlice.reducer
