import { createSlice } from "@reduxjs/toolkit";

interface IUser {
  email: string;
  full_name: string;
  id: string;
  role: string;
}

export interface ISecretState {
  user: IUser;
  token: string;
}
const defaultUser = {
  email: "",
  full_name: "",
  id: "",
  role: "",
};
const initialState: ISecretState = {
  user: { ...defaultUser },
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.user = action?.payload.user;
      state.token = action?.payload.token;
    },
    removeUser: (state) => {
      state.user = { email: "", full_name: "", id: "", role: "" };
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
export const { removeUser, updateUser, updateToken, loginUser } =
  authSlice.actions;

export default authSlice.reducer;
