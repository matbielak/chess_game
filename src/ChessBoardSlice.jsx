import { createSlice } from "@reduxjs/toolkit";
import { mapMove, toFen } from "./Moves";
const startingBoard =  [
        ['r','n','b','q','k','b','n','r'],
        ['p','p','p','p','p','p','p','p'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['-','-','-','-','-','-','-','-'],
        ['P','P','P','P','P','P','P','P'],
        ['R','N','B','Q','K','B','N','R'],
];
const startingFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const initialState = {
    moves: [startingBoard],
    board: startingBoard,
    whiteMove: true,
    castlingRights: ['1','1','1','1'],
    whiteInCheck: false,
    blackInCheck: false,
    mate: false,
    lastMove: null,
    histMove: 0,
    lastHistMoves: [],
    pgn: [],
    fen: startingFen,
    flipped: false,
    game: false,
    evaluation: "0.0",
    bestMove: "Loading...",

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
            const lastMove = {from:from,to:to}
            var newWhiteMove = !state.whiteMove;
            var newHistMove = state.histMove+1;
            var newPgn = [...state.pgn]
            if(piece == 't'){
                newWhiteMove = !newWhiteMove;
                newHistMove = newHistMove-1;

            }
            else{
                console.log(mapMove(from,to,piece,state.board,newBoard))
                
                newPgn.push(mapMove(from,to,piece,state.board,newBoard))

            }
            var newMoves = [...state.moves];
            var newLastHistMoves = [...state.lastHistMoves];
            
            if(piece != 't'){
                newMoves.push(newBoard)
                newLastHistMoves.push(lastMove)
            }
            
            const newFen = toFen(newBoard,newWhiteMove,state.castlingRights,newPgn.length,lastMove)
            
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,
                lastMove: lastMove,
                moves: newMoves,
                histMove: newHistMove,
                lastHistMoves: newLastHistMoves,
                pgn: newPgn,
                fen: newFen,
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
            var newMoves = [...state.moves];
            const newHistMove = state.histMove+1;
            newMoves.push(newBoard)
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,
                moves: newMoves,
                histMove: newHistMove,

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
            var lastMove = null;
            var newPgn = [...state.pgn]
                
            if(idx == 0 && state.castlingRights[0]=='1'){
                // castle queenside black
                newBoard[0][4]='-';
                newBoard[0][0]='-';
                newBoard[0][2]='k';
                newBoard[0][3]='r';
                newCastlingRights[0]='0';
                newCastlingRights[1]='0';
                lastMove={from:{r:0,c:2},to:{r:0,c:3}}
                newPgn.push("O-O-O")

            }
            else if(idx == 1 && state.castlingRights[1]=='1'){
                // castle kingside black
                newBoard[0][4]='-';
                newBoard[0][7]='-';
                newBoard[0][6]='k';
                newBoard[0][5]='r';
                newCastlingRights[0]='0';
                newCastlingRights[1]='0';
                lastMove={from:{r:0,c:6},to:{r:0,c:5}}
                newPgn.push("O-O")

            }
            else if(idx == 2 && state.castlingRights[2]=='1'){
                // castle queenside white
                newBoard[7][0]='-';
                newBoard[7][4]='-';
                newBoard[7][2]='K';
                newBoard[7][3]='R';
                newCastlingRights[2]='0';
                newCastlingRights[3]='0';
                lastMove={from:{r:7,c:2},to:{r:7,c:3}}
                newPgn.push("O-O-O")

            }
             else if(idx == 3 && state.castlingRights[3]=='1'){
                // castle queenside white
                newBoard[7][4]='-';
                newBoard[7][7]='-';
                newBoard[7][6]='K';
                newBoard[7][5]='R';
                newCastlingRights[2]='0';
                newCastlingRights[3]='0';
                lastMove={from:{r:7,c:6},to:{r:7,c:5}}
                newPgn.push("O-O")
            }
            const newWhiteMove = !state.whiteMove;
            var newMoves = [...state.moves];
            const newHistMove = state.histMove+1;
            newMoves.push(newBoard)
            var newLastHistMoves = [...state.lastHistMoves];
            newLastHistMoves.push(lastMove)
            return {
                ...state,
                board: newBoard,
                whiteMove: newWhiteMove,
                castlingRights: newCastlingRights,
                lastMove: lastMove,
                moves: newMoves,
                histMove: newHistMove,
                lastHistMoves: newLastHistMoves,
                pgn: newPgn,

            }

        },
        changeBoard: (state,action) => {
            const idx = action.payload;
            return {
                ...state,
                board: state.moves[idx],
                histMove: idx,
            }
        },
        setHistMove: (state,action) => {
            const idx = action.payload;
            return {
                ...state,
                histMove: idx,
            }
        },
        setFen: (state,action)=> {
            const fen = toFen(state.board,state.whiteMove,state.castlingRights,state.pgn.length,state.lastMove)
            return {
                ...state,
                fen: fen,
            }
        },
        flip: (state) => {
            var newFlipped = !state.flipped;
            return {
                ...state,
                flipped: newFlipped,
            }
        },
        play: (state) => {
            var newGame = state.game;
            if(!newGame){
                newGame = true;
            }
            return {
                ...state,
                game: newGame,
            }
        },
        setEvalu: (state,action) => {
            console.log("Action payload: ",action.payload);
            
            const e = action.payload;
            return {
                ...state,
                evaluation: e,
            }
        },
        setBestMove: (state,action) => {
            
            
            const bm = action.payload;
            return {
                ...state,
                bestMove: bm,
            }
        },

    }
})

export const {updateSquare, resetBoard, deleteTemps,enP,castle,changeCastlingRights,changeBoard,setHistMove,setFen,flip,play,setEvalu,setBestMove} = ChessBoardSlice.actions;
export default ChessBoardSlice.reducer;