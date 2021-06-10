import { createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import { getFetchUser, setFetchUserData, signInFetch, signUpFetch } from '../../../utils/api/api'
import { setCookie } from "../../../utils/functions/cookies";
import { push } from "connected-react-router";
import {getUserData} from "./selectors";

export const sliceName = "auth";

export const registerUser = createAsyncThunk<any, any, any>(
    `${sliceName}/registerUser`,
    async (registerData, { dispatch  }) => {
        const res = await signUpFetch(registerData)
        console.log(res, 'res', registerData)
        const accessToken = res.accessToken.split('Bearer ')[1]
        const refreshToken = res.refreshToken
        setCookie('token', accessToken, null)
        localStorage.setItem('token', refreshToken);
        dispatch(setUserData(res))
        // dispatch(push("/"));
        return registerData;
    }
);

export const loginUser = createAsyncThunk<any, any, any>(
    `${sliceName}/loginUser`,
    async (loginData, { dispatch}) => {
        const res = await signInFetch(loginData)
        const accessToken = res.accessToken.split('Bearer ')[1]
        const refreshToken = res.refreshToken
        setCookie('token', accessToken, null)
        localStorage.setItem('token', refreshToken);
        return loginData;
    }
);

export const patchUser = createAsyncThunk<any, any, any>(
    `${sliceName}/patchUser`,
    async (changeData, { dispatch}) => {
        const res = await setFetchUserData(changeData)
        setUserData(res)
        return changeData;
    }
);
export const getUser = createAsyncThunk<any, any, any>(
    `${sliceName}/getUser`,
    async (_, {dispatch}) => {
        const res = await getFetchUser()
        console.log(res, 'getUserData')
        dispatch(setUserData(res))
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
            console.log('payload', action.payload)
            state.data = action.payload.user
        });
        builder.addCase(loginUser.rejected, (state:AuthState, action:any) => {
            state.loginSending = false;
            console.log(action)
            state.loginError = action.error;
        });
        builder.addCase(getUser.pending, (state:AuthState) => {
            state.getUserSending = true;
        });
        builder.addCase(getUser.fulfilled, (state:AuthState, action:PayloadAction<any>) => {
            state.getUserSending = false;
            state.getUserError = null;
            console.log('payload', action.payload)
            state.data = action.payload.user
        });
        builder.addCase(getUser.rejected, (state:AuthState, action:any) => {
            state.getUserSending = false;
            state.getUserError = action.error;
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
