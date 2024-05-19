import { ReadUserResponse, UserLoginResponse } from "@/models/user";
import { getToken, removeToken, setToken } from "@/utils/sesstionStorage";
import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserAsyncThunk } from "../action/authAction";

interface IInitialState extends UserLoginResponse {
  error: string | null;
  success: boolean;
  loading: boolean;
}

const initialState: IInitialState = {
  access_token: getToken(),
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: {
        type: string;
        payload: UserLoginResponse;
      }
    ) => {
      state.success = true;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      setToken(action.payload.access_token ?? "");
    },
    userLogout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.success = false;
      state.access_token = null;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCurrentUserAsyncThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getCurrentUserAsyncThunk.fulfilled,
      (
        state,
        action: {
          type: string;
          payload: ReadUserResponse;
        }
      ) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      }
    );
    builder.addCase(getCurrentUserAsyncThunk.rejected, (state, action) => {
      state.success = false;
      state.error = action.payload as string;
      state.user = null;
      state.access_token = null;
      removeToken();
    });
  },
});

export const { setCredentials, userLogout } = authSlice.actions;
export default authSlice.reducer;
