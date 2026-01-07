import { createSlice } from "@reduxjs/toolkit";

const token = (() => {
  try {
    return JSON.parse(localStorage.getItem("token"));
  } catch {
    return null;
  }
})();

const initialState = {
  signupData: null,
  token: token,
  user: null,
  isAuthenticated: !!token,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData(state, action) {
      state.signupData = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;

      if (action.payload) {
        localStorage.setItem("token", JSON.stringify(action.payload));
      } else {
        localStorage.removeItem("token");
      }
    },

    setUser(state, action) {
      state.user = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setSignupData,
  setLoading,
  setToken,
  setUser,
  setError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
