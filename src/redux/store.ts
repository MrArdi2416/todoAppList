import { configureStore } from "@reduxjs/toolkit";
import { tasksReducer } from "./taskSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    storage,
  };

const persistedReducer = persistReducer(persistConfig, tasksReducer);


const store = configureStore({
  reducer: {
    tasks: persistedReducer,
  },
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default store;