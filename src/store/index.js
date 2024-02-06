import { createSlice, configureStore } from "@reduxjs/toolkit";
const counterSlice = createSlice({
  name: "counter",
  initialState: {
    email: localStorage.getItem("email") || "",
  },
  reducers: {
    setEmail: (state, { payload }) => {
      return {
        email: payload,
      };
    },
  },
});
export const store = configureStore({
  reducer: counterSlice.reducer,
});

export const { setEmail } = counterSlice.actions;
