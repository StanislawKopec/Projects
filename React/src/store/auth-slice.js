import { createSlice } from "@reduxjs/toolkit";
import Register from "../pages/Register";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    loggedInUser: "",
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.loggedInUser = action.payload;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
    register(state, action) {
      console.log(state);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
