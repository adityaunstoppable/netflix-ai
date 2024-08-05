import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    userName: "",
    email: "",
    password:""
  },
  reducers: {
    updateUser(state, action) {
      state.userName = action.payload.userName
      state.email = action.payload.email
      state.password = action.payload.password
    },
    removeUser(state){
        state.userName=""
        state.email=""
        state.password=""
    }
  },
});

export const {updateUser, removeUser} = userSlice.actions;
export default userSlice.reducer;