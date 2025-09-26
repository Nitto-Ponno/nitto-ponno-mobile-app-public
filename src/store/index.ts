import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";

import rootReducer from "./reducer/combineReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: [], // Add any reducers you don't want to persist
  // whitelist: ['auth', 'cart'], // Or specify which ones to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist's non-serializable action payloads
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Global reset action that reducers can handle to return their initial state
export const RESET_APP = "RESET_APP";

const persistor = persistStore(store);

// Function to clear Redux state (in-memory) and persisted data (storage)
export const clearStore = async () => {
  try {
    // Stop writing to storage while we clear it
    persistor.pause();

    // Remove persisted state from storage
    await persistor.purge();

    // Ensure any pending write queue is flushed
    await persistor.flush();

    // Reset in-memory state (reducers should return initial state on RESET_APP)
    store.dispatch({ type: RESET_APP });

    // Resume persistence
    persistor.persist();
  } catch (error) {
    console.error("Error clearing store:", error);
  }
};

export { persistor };
export default store;
