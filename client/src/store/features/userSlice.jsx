import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  token: "",
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
  },
});

//export actions and slice
export const { reset, updateToken, update } = userSlice.actions;
export default userSlice.reducer;
