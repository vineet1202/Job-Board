import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
  expiresAt: "",
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset() {
      return {};
    },
    updateToken(state, { payload: { token } }) {
      state.token = token;
    },
    update(state, { payload }) {
      return { ...state, ...payload };
    },

    login(state, { payload }) {
      return {
        name: payload.name,
        email: payload.email,
        status: "succeeded",
        isAuthenticated: true,
        token: payload.token,
        expiresAt: payload.expiresAt,
      };
    },
  },
});

//export actions and slice
export const { reset, updateToken, update, login } = userSlice.actions;
export default userSlice.reducer;
