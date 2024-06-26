import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const getCurrentUserAsyncThunk = createAsyncThunk(
  "auth/getCurrentUser",
  async (access_token: string, thunkAPI) => {
    if (!access_token) return null;

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (!response.ok) {
      const errMsg = await response.json();
      return thunkAPI.rejectWithValue(errMsg?.detail || errMsg);
    }

    return response.json();
  },
  {
    condition: (__, { getState }) => {
      // condition re-fetch
      const { auth } = getState() as RootState;
      if (auth.loading) {
        return false;
      }
      return true;
    },
  }
);
