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
    castlingRights: ['1','1','1','1'],
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

            var newWhiteMove = !state.whiteMove;
            if(piece == 't'){
                newWhiteMove = !newWhiteMove;
            }
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,

            }
        },
        resetBoard: () => initialState,
        deleteTemps: (state,action) => {
            const [row,col] = action.payload;
            const newBoard = state.board.map((row)=>[...row]);
           
            if(state.board[row][col]=='t')
                newBoard[row][col] = '-';
            
            const newWhiteMove = state.whiteMove;
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,

            }

        },
        enP: (state,action) => {
            const [row,col] = action.payload;
            const newBoard = state.board.map((row)=>[...row]);
           
            if(state.board[row][col].toLowerCase()=='p')
                newBoard[row][col] = '-';
            
            const newWhiteMove = state.whiteMove;
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,

            }
        },
        changeCastlingRights: (state,action) => {
            const idx = action.payload;
            const newCastlingRights = [...state.castlingRights]
            newCastlingRights[idx] = '0';
            return {
                ...state,
                castlingRights: newCastlingRights
            }
        },
        castle: (state,action) => {
            const idx = action.payload;
            console.log(`idx: ${idx}`)
            const newBoard = state.board.map((row)=>[...row]);
            const newCastlingRights = [...state.castlingRights];
            if(idx == 0 && state.castlingRights[0]=='1'){
                // castle queenside black
                newBoard[0][4]='-';
                newBoard[0][0]='-';
                newBoard[0][2]='k';
                newBoard[0][3]='r';
                newCastlingRights[0]='0';
                newCastlingRights[1]='0';

            }
            else if(idx == 1 && state.castlingRights[1]=='1'){
                // castle kingside black
                newBoard[0][4]='-';
                newBoard[0][7]='-';
                newBoard[0][6]='k';
                newBoard[0][5]='r';
                newCastlingRights[0]='0';
                newCastlingRights[1]='0';

            }
            else if(idx == 2 && state.castlingRights[2]=='1'){
                // castle queenside white
                newBoard[7][0]='-';
                newBoard[7][4]='-';
                newBoard[7][2]='K';
                newBoard[7][3]='R';
                newCastlingRights[2]='0';
                newCastlingRights[3]='0';

            }
             else if(idx == 3 && state.castlingRights[3]=='1'){
                // castle queenside white
                newBoard[7][4]='-';
                newBoard[7][7]='-';
                newBoard[7][6]='K';
                newBoard[7][5]='R';
                newCastlingRights[2]='0';
                newCastlingRights[3]='0';

            }
            const newWhiteMove = !state.whiteMove;
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,
                castlingRights: newCastlingRights,

            }

        }
    }
})

export const {updateSquare, resetBoard, deleteTemps,enP,castle,changeCastlingRights} = ChessBoardSlice.actions;
export default ChessBoardSlice.reducer;