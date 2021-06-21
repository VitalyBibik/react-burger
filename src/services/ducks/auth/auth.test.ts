import {
  authReducer,
  AuthState,
  forgotUserPassword,
  getUser,
  loginUser,
  patchUser,
  refreshToken,
  registerUser,
  resetError,
  setUserData,
  setUserPassword,
  signOut,
  sliceName,
} from './slice';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as tokenFunc from '../../../utils/functions/tokens';
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

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
  tokenUpdated: false,
  tokenUpdateDate: null,
  tokenUpdateError: null,
  emailSent: false,
  patchUserSending: false,
  patchUserError: null,
  signOutSending: false,
  signOutError: null,
};

describe(`${sliceName} extraReducers`, () => {
  it('should handle Login Request pending', () => {
    expect(authReducer(initialState, { type: loginUser.pending })).toEqual(
      expect.objectContaining({
        loginSending: true,
      })
    );
  });
  it('should handle Login Request success', () => {
    expect(
      authReducer(initialState, {
        type: loginUser.fulfilled,
        payload: { user: { email: 'test@mail.ru', name: 'vitalik' } },
      })
    ).toEqual(
      expect.objectContaining({
        data: { email: 'test@mail.ru', name: 'vitalik' },
        loginSending: false,
        loginError: null,
      })
    );
  });
  it('should handle Login Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: loginUser.rejected,
        error: { message: 'Email or password incorrect' },
      })
    ).toEqual(
      expect.objectContaining({
        loginSending: false,
        loginError: { message: 'Email or password incorrect' },
      })
    );
  });
  it('should handle Register Request pending', () => {
    expect(
      authReducer(initialState, {
        type: registerUser.pending,
      })
    ).toEqual(
      expect.objectContaining({
        registerSending: true,
      })
    );
  });
  it('should handle Register Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: registerUser.fulfilled,
        payload: { user: { email: 'test@mail.ru', name: 'vitalik' } },
      })
    ).toEqual(
      expect.objectContaining({
        registerSending: false,
        registerError: null,
        data: { email: 'test@mail.ru', name: 'vitalik' },
      })
    );
  });
  it('should handle Register Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: registerUser.rejected,
        error: { message: 'Email or password allready used' },
      })
    ).toEqual(
      expect.objectContaining({
        registerSending: false,
        registerError: { message: 'Email or password allready used' },
      })
    );
  });
  it('should handle getUser Request pending', () => {
    expect(
      authReducer(initialState, {
        type: getUser.pending,
      })
    ).toEqual(
      expect.objectContaining({
        getUserSending: true,
      })
    );
  });
  it('should handle getUser Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: getUser.fulfilled,
        payload: { user: { email: 'test@mail.ru', name: 'vitalik' } },
      })
    ).toEqual(
      expect.objectContaining({
        getUserSending: false,
        getUserError: null,
        data: { email: 'test@mail.ru', name: 'vitalik' },
      })
    );
  });
  it('should handle getUser Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: getUser.rejected,
        error: { message: 'Token is expired' },
      })
    ).toEqual(
      expect.objectContaining({
        getUserSending: false,
        getUserError: { message: 'Token is expired' },
      })
    );
  });
  it('should handle setUserPassword Request pending', () => {
    expect(
      authReducer(initialState, {
        type: setUserPassword.pending,
      })
    ).toEqual(
      expect.objectContaining({
        setUserPasswordSending: true,
      })
    );
  });
  it('should handle setUserPassword Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: setUserPassword.fulfilled,
      })
    ).toEqual(
      expect.objectContaining({
        setUserPasswordSending: false,
        setUserPasswordError: null,
      })
    );
  });
  it('should handle setUserPassword Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: setUserPassword.rejected,
        error: { message: 'Token is expired' },
      })
    ).toEqual(
      expect.objectContaining({
        setUserPasswordSending: false,
        setUserPasswordError: { message: 'Token is expired' },
      })
    );
  });
  it('should handle forgotUserPassword Request pending', () => {
    expect(
      authReducer(initialState, {
        type: forgotUserPassword.pending,
      })
    ).toEqual(
      expect.objectContaining({
        forgotUserPasswordSending: true,
      })
    );
  });
  it('should handle forgotUserPassword Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: forgotUserPassword.fulfilled,
      })
    ).toEqual(
      expect.objectContaining({
        forgotUserPasswordSending: false,
        forgotUserPasswordError: null,
        emailSent: true,
      })
    );
  });
  it('should handle forgotUserPassword Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: forgotUserPassword.rejected,
        error: { message: 'Token is expired' },
      })
    ).toEqual(
      expect.objectContaining({
        forgotUserPasswordSending: false,
        forgotUserPasswordError: { message: 'Token is expired' },
      })
    );
  });
  it('should handle signOut Request pending', () => {
    expect(
      authReducer(initialState, {
        type: signOut.pending,
      })
    ).toEqual(
      expect.objectContaining({
        signOutSending: true,
      })
    );
  });
  it('should handle signOut Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: signOut.fulfilled,
      })
    ).toEqual(
      expect.objectContaining({
        signOutSending: false,
        signOutError: null,
        tokenUpdated: false,
        tokenUpdateDate: null,
      })
    );
  });
  it('should handle signOut Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: signOut.rejected,
        error: { message: 'Fetch is failed' },
      })
    ).toEqual(
      expect.objectContaining({
        signOutSending: false,
        signOutError: { message: 'Fetch is failed' },
      })
    );
  });
  it('should handle refreshToken Request pending', () => {
    expect(
      authReducer(initialState, {
        type: refreshToken.pending,
      })
    ).toEqual(
      expect.objectContaining({
        tokenUpdated: false,
      })
    );
  });
  it('should handle refreshToken Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: refreshToken.fulfilled,
        payload: { token: '124125156125156156156156156156156' },
      })
    ).toEqual(
      expect.objectContaining({
        tokenUpdated: true,
        tokenUpdateDate: true,
        data: { token: '124125156125156156156156156156156' },
      })
    );
  });
  it('should handle refreshToken Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: refreshToken.rejected,
        error: { message: 'Fetch is failed' },
      })
    ).toEqual(
      expect.objectContaining({
        tokenUpdated: true,
        tokenUpdateDate: false,
        tokenUpdateError: { message: 'Fetch is failed' },
      })
    );
  });
  it('should handle patchUser Request pending', () => {
    expect(
      authReducer(initialState, {
        type: patchUser.pending,
      })
    ).toEqual(
      expect.objectContaining({
        patchUserSending: true,
      })
    );
  });
  it('should handle patchUser Request fulfilled', () => {
    expect(
      authReducer(initialState, {
        type: patchUser.fulfilled,
        payload: { user: { email: 'test@mail.ru', name: 'Vitalik' } },
      })
    ).toEqual(
      expect.objectContaining({
        patchUserSending: false,
        data: { user: { email: 'test@mail.ru', name: 'Vitalik' } },
      })
    );
  });
  it('should handle patchUser Request rejected', () => {
    expect(
      authReducer(initialState, {
        type: patchUser.rejected,
        error: { message: 'Fetch is failed' },
      })
    ).toEqual(
      expect.objectContaining({
        patchUserSending: false,
        patchUserError: { message: 'Fetch is failed' },
      })
    );
  });
});
describe(`${sliceName} Reducers`, () => {
  it('should setUser null', () => {
    expect(
      authReducer(initialState, {
        type: setUserData,
        payload: null,
      })
    ).toEqual(
      expect.objectContaining({
        data: null,
      })
    );
  });
  it('should reset allErrors', () => {
    expect(
      authReducer(initialState, {
        type: resetError,
      })
    ).toEqual(
      expect.objectContaining({
        registerError: null,
        loginError: null,
        getUserError: null,
        setUserPasswordError: null,
        forgotUserPasswordError: null,
        tokenUpdateError: null,
      })
    );
  });
  it('should return the initial state', () => {
    expect(authReducer(undefined, { type: undefined })).toEqual(initialState);
  });
});


const responseData = {
    "success":true,
    "accessToken":"Bearer test",
    "refreshToken":"test",
    "user":{"email":"review@mail.com","name":"Review"}
}
describe('login action', () => {
    afterEach(() => {
        fetchMock.restore();
        tokenFunc.setTokens.mockRestore();
    });
    it('should handle success login', () => {
        const initialState = {};
        const store = mockStore(initialState);
    // @ts-ignore
        tokenFunc.setTokens = jest.fn();
    fetchMock.post('https://norma.nomoreparties.space/api/auth/login', {
        body: responseData,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const answer = [
        { type: "authReducer/loginUser/pending"},
        { type: "@@router/CALL_HISTORY_METHOD" },
        { type: "authReducer/loginUser/fulfilled", payload: responseData }
    ];
    // @ts-ignore
        return store.dispatch(loginUser({login: "name", password: "password"})).then(() => {
        const actions = store.getActions()
        expect(actions[0]).toEqual( expect.objectContaining(answer[0]));
        expect(actions[1]).toEqual( expect.objectContaining(answer[1]));
        expect(actions[2]).toEqual( expect.objectContaining(answer[2]));
        expect(tokenFunc.setTokens).toHaveBeenCalledTimes(1);
        expect(tokenFunc.setTokens).toHaveBeenCalledWith(responseData)
    });
    });
});
