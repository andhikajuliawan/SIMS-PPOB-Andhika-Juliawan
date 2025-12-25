import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store.ts';
import type { Auth } from '../../intefaces/authInterface.ts';

const token = localStorage.getItem('token');
const initialState: Auth = {
  token: token || '',
  isAuthenticated: !!token,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
      state.isAuthenticated = true;
      localStorage.setItem('token', state.token)
    }
  },
});

export const {setToken} = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
