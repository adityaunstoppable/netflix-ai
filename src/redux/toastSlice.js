import { createSlice } from "@reduxjs/toolkit";

const toastSlice = createSlice({
  name: "toastSlice",
  initialState: { open: false, message: "", severity: "" },
  reducers: {
    openToast(state, action) {
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity;
    },
  },
});

export const { openToast } = toastSlice.actions;

export default toastSlice.reducer;
