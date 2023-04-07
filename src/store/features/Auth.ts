import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  name: string;
}

export interface ISecretState {
  user: IUser;
  token: string;
}
const defaultUser = {
  email: "",
  name: "",
};
const initialState: ISecretState = {
  user: { ...defaultUser },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser: (state) => {
      state.user = { email: "", name: "" };
    },
    updateUser: (state, action) => {
      state.user = action?.payload.user;
    },
    updateToken: (state, action) => {
      state.token = action?.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { removeUser, updateUser, updateToken } = authSlice.actions;

export default authSlice.reducer;
