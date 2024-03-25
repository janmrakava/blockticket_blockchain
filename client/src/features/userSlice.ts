import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  telNumber: string;
}

const initialState: UserState = {
  firstName: '',
  lastName: '',
  email: '',
  dateOfBirth: new Date(),
  telNumber: ''
};

export const languageSlice = createSlice({
  name: 'appLanguage',
  initialState,
  reducers: {
    changeUserData: (state, action: PayloadAction<UserState>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.telNumber = action.payload.telNumber;
    }
  }
});

export const { changeUserData } = languageSlice.actions;

export default languageSlice.reducer;
