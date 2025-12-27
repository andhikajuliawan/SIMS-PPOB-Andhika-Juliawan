import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import type { User, UserData } from '../../intefaces/user.interface.ts';

const initialState: User = {
  email: '',
  first_name: '',
  last_name: '',
  profile_image: '',
  balance: 0,
  showBalance: true,
  isLoadingUser: true,
  isLoadingBalance: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.profile_image = action.payload.profile_image;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingUser = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<string>) => {
      state.profile_image = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    setShowBalance: (state, action: PayloadAction<boolean>) => {
      state.showBalance = action.payload;
    },
    setBalanceLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingBalance = action.payload;
    },
  },
});

export const {
  setUser,
  setUserLoading,
  setProfileImage,
  setBalance,
  setShowBalance,
  setBalanceLoading,
} = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
