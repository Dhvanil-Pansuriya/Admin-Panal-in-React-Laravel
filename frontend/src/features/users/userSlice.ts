import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: number;
  name: string;
  email: string;
  role: number;
  token: string;
}

interface UserState {
  userData: User | null;
  isAuthenticated: boolean;
}

const storedUser = localStorage.getItem('user');

const initialState: UserState = storedUser
  ? {
    userData: JSON.parse(storedUser),
    isAuthenticated: true
  }
  : { userData: null, isAuthenticated: false };

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logoutUser: (state) => {
      state.userData = null;
      state.isAuthenticated = false;
      localStorage.removeItem('user');
      localStorage.removeItem('authToken');
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.userData) {
        state.userData = { ...state.userData, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.userData));
      }
    },
  },
});

export const { loginUser, logoutUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
