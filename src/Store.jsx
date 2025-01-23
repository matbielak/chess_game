import { configureStore } from "@reduxjs/toolkit";
import ChessBoardReducer from './ChessBoardSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    chessboard: ChessBoardReducer,
});

const persistConfig = {
    key: 'root',
    storage,
};
const persistedReducer = persistReducer(persistConfig,rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable warnings for non-serializable values
    }),
});

export const persistor = persistStore(store);
export default store;
