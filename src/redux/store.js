import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import movieSlice from "./movieSlice";
import gptSlice from "./gptSlice";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import toastSlice from "./toastSlice";

const userPersistConfig = {
  key: "user",
  storage,
};

const persistedUserSlice = persistReducer(userPersistConfig, userSlice);

const store = configureStore({
  reducer: {
    user: persistedUserSlice,
    movies: movieSlice,
    gpt: gptSlice,
    toast: toastSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export {store, persistor};
