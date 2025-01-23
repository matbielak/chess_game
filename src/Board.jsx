import React from 'react'
import Square from './Square'
import { useSelector, useDispatch } from 'react-redux'
import BoardSquare from './BoardSquare'
import { changeBoard, resetBoard, setHistMove } from './ChessBoardSlice'
import { isKingInCheck,getAllLegalMoves, mapMove} from './Moves'
import { ESModulesEvaluator } from 'vite/module-runner'
function Board() {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.chessboard.board)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const whiteCheck = isKingInCheck(board,true);
    const blackCheck = isKingInCheck(board,false);
    const legalMoves = getAllLegalMoves(board,!whiteMove);
    const castlingRights = useSelector((state) => state.chessboard.castlingRights)
    const moves = useSelector((state) => state.chessboard.moves)
    const histMove = useSelector((state) => state.chessboard.histMove)
    const pgn = useSelector((state) => state.chessboard.pgn )
    const noMoves = moves.length-1;
    const handleBack = () =>{
      if(histMove>0){
        console.log(`Hist move: ${histMove}`)
        dispatch(changeBoard(histMove-1))
      }
      
    }
    const handleNext = () => {
      if(histMove<noMoves){
        dispatch(changeBoard(histMove+1))
        dispatch(setHistMove(histMove+1))
      }
      
    }

  return (
    <>
    {
      pgn.map((move,idx)=> {
        if(idx%2==0)
          return (idx/2+1) + ". " + move + " ";
        return move + " "; 
      })
    }
    <button onClick={handleBack}>Back</button>
    <button onClick={handleNext}>Next</button>
    {/* <div>{castlingRights}</div> */}
    {blackCheck && legalMoves==0 && <div>WHITE WINS</div>}
    {whiteCheck && legalMoves==0 && <div>BLACK WINS</div>}
    {!whiteCheck && !blackCheck && legalMoves==0 && <div>DRAW</div>}
    {/* <div>Legal moves: {legalMoves}</div> */}
    {whiteCheck && <div>White Is In CHECK</div>}
    {blackCheck && <div>Black Is In CHECK</div>}
    <button onClick={() => dispatch(resetBoard())}>Reset</button>
    {whiteMove==true && <div>White</div>}
    {whiteMove==false && <div>Black</div>}
      {/* <div>{board}</div> */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)'}}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square key={`${rowIndex}-${colIndex}`} row={rowIndex} col={colIndex} piece={square} />
        ))
      )}
    </div>
    </>
     
  )
}

export default Board