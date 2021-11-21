import { createSlice } from "@reduxjs/toolkit";
const LoginControl = createSlice({
  name: "login",
  initialState: { loginPage: true, id: null, signup: false },
  reducers: {
    loggingin(state, action) {
      state.loginPage = false;
      state.id = action.payload.id;
    },
    loggingout(state) {
      state.loginPage = true;
      state.id = null;
    },
    signup(state) {
      state.signup = !state.signup;
    },
  },
});
export const loginActions = LoginControl.actions;
export default LoginControl;
