import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import expenseSlice from "./slices/expenseSlice";

const reducers = combineReducers({
  [api.reducerPath]: api.reducer,
  expense: expenseSlice
});
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(api.middleware),
  devTools: true
});
