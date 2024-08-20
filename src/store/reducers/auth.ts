import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../rootConfig";
import { queryClient } from "@/utils/helper";

interface State {
  token: string | null;
  link: string;
}

const initialState: State = {
  token: null,
  link: "/dashboard",
};

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logoutHandler: (state) => {
      state.token = null;
      queryClient.clear();

      const { pathname, search } = window.location;
      if (pathname.includes("login") || pathname === "/")
        state.link = "/dashboard";
      else state.link = pathname + search;
    },
    loginHandler: (state, { payload }) => {
      state.token = payload;
    },
  },
});

export const tokenSelector = (state: RootState) => state.auth.token;
export const linkSelector = (state: RootState) => state.auth.link;

export const { loginHandler, logoutHandler } = authReducer.actions;

export default authReducer.reducer;
