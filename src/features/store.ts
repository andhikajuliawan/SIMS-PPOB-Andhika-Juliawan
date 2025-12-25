import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice.ts';
import { userSlice } from './user/userSlice.ts';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    user: userSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch