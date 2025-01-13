import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    board: [
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['P','P','P','P','P','P','P','P'],
        ['R','N','B','Q','K','B','N','R'],
    ],
    whiteMove: true,
    whiteInCheck: false,
    blackInCheck: false,
    mate: false,
}

const ChessBoardSlice = createSlice({
    name: 'chessboard',
    initialState,
    reducers:{
        updateSquare: (state,action) => {
            const {from,to,piece} = action.payload;
            const newBoard = state.board.map((row)=>[...row]);
            newBoard[from.r][from.c] = '-';
            newBoard[to.r][to.c] = piece;

            const newWhiteMove = !state.whiteMove;
            
            return {
                board: newBoard,
                whiteMove: newWhiteMove,

            }
        },
        resetBoard: () => initialState,
    }
})

export const {updateSquare, resetBoard} = ChessBoardSlice.actions;
export default ChessBoardSlice.reducer;