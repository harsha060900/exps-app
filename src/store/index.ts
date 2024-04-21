import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";

export const store = configureStore({
    reducer:{
        [api.reducerPath]:api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
          api.middleware
        ),
    devTools:true
})