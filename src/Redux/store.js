import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { apiSlice } from "./api/apiSlice";
import { authReducer } from "./feature/auth/authSlice";


const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "chat"], // ✅ auth persist korbo
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer, //
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredActionPaths: ["register", "rehydrate", "meta.baseQueryMeta"],
      },
    }).concat(apiSlice.middleware),
});

const persistor = persistStore(store); // ✅ correct spelling

// ✅ Final export
export { store, persistor };