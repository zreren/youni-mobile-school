import { createSlice } from '@reduxjs/toolkit';
import { AppState } from './store';
import { HYDRATE } from 'next-redux-wrapper';

type OpenLogin  = 'login' | 'close' | 'register';
// Type for our state
export interface AuthState {
  loginModelState: boolean;
  openLogin: OpenLogin;
}
export interface SelectOpenState {
    openLogin: boolean;
}
// Initial state
const initialState: AuthState = {
  loginModelState: false,
  openLogin: 'close',
};
const selectOpenState: SelectOpenState = {
    openLogin:false
}
// Actual Slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Action to set the authentication status
    seLoginModelState(state, action) {
      state.loginModelState = action.payload;
    },

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    // extraReducers: {
    //     [HYDRATE]: (state, action) => {
    //         return {
    //             ...state,
    //             ...action.payload.auth,
    //         };
    //     },
    // },
  },
});
export const openLogin = createSlice({
  name: 'openLogin',
  initialState,
  reducers: {
    // Action to set the authentication status
    setOpenLogin(state, action) {
      state.openLogin = action.payload;
    },
  },
});
export const { seLoginModelState } = authSlice.actions;
export const { setOpenLogin } = openLogin.actions;
export const selectLoginModelState = (state: AppState) => state.auth.loginModelState;
export const selectOpen = (state: AppState) => state.openLogin.openLogin;

export default authSlice.reducer;
// export default openLogin.reducer;
