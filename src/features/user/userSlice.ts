import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store.ts';
import type {
  SetUserPayloadAction,
  User,
} from '../../intefaces/user.interface.ts';

const initialState: User = {
  email: '',
  first_name: '',
  last_name: '',
  profile_image: '',
  isLoading: true,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SetUserPayloadAction>) => {
      state.email = action.payload.email;
      state.first_name = action.payload.first_name;
      state.last_name = action.payload.last_name;
      state.profile_image = action.payload.profile_image;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setUser, setUserLoading } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
