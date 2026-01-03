import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: state => {
      state.loading = true;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },

    loginFailure: state => {
      state.loading = false;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
    },
    
    logout: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  updateUser,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
