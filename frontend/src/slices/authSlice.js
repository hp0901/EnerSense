import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");
const user = (() => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
})();

const initialState = {
  signupData: null,
  token,
  user,
  isAuthenticated: Boolean(token),
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
      state.isAuthenticated = Boolean(action.payload);

      if (action.payload) {
        localStorage.setItem("token", action.payload);
      } else {
        localStorage.removeItem("token");
      }
    },

    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    setError(state, action) {
      state.error = action.payload;
    },

    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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
