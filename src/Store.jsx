import { configureStore } from "@reduxjs/toolkit";
import ChessBoardReducer from './ChessBoardSlice';


const store = configureStore({
    reducer:{
        chessboard: ChessBoardReducer
    },
})

export default store;
