import { createAsyncThunk, createSlice, PayloadAction, SerializedError} from "@reduxjs/toolkit";
import { signIn, signUp } from '../../../utils/api/api'
import { setCookie } from "../../../utils/functions/cookies";

export const sliceName = "auth";

export const registerUser = createAsyncThunk<any, any, any>(
    `${sliceName}/registerUser`,
    async (registerData, { dispatch  }) => {
        return await signUp(registerData);
    }
);

export const loginUser = createAsyncThunk<any, any, any>(
    `${sliceName}/loginUser`,
    async (loginData, { dispatch}) => {
        const res = await signIn(loginData)
        const accessToken = res.accessToken.split('Bearer')[1]
        const refreshToken = res.refreshToken
        setCookie('token', accessToken, null)
        localStorage.setItem('token', refreshToken);
        dispatch(setUserData(res))
        return loginData;
    }
);

// export const checkAuth = createAsyncThunk<any, any, any>(
//     `${sliceName}/checkAuth`,
//     async () => {
//         const token = localStorage.getItem("jwt");
//         if (token) return await authApi.checkToken(token);
//         return Promise.reject("Нет токена");
//     }
// );

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
}

const initialState: AuthState = {
    data: null,
    authChecking: true,
    registerSending: false,
    registerError: null,
    loginSending: false,
    loginError: null,
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
            console.log('payload', action.payload)
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
            state.data = {
                email: action.payload.email
            };
        });
        builder.addCase(loginUser.rejected, (state:AuthState, action:any) => {
            state.loginSending = false;
            state.loginError = action.error;
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
