import React from 'react'
import Square from './Square'
import { useSelector, useDispatch } from 'react-redux'
import BoardSquare from './BoardSquare'
import { resetBoard } from './ChessBoardSlice'
import { isKingInCheck,getAllLegalMoves } from './Moves'
function Board() {
    const dispatch = useDispatch();
    const board = useSelector((state) => state.chessboard.board)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const whiteCheck = isKingInCheck(board,true);
    const blackCheck = isKingInCheck(board,false);
    const legalMoves = getAllLegalMoves(board,!whiteMove);


  return (
    <> 
    {blackCheck && legalMoves==0 && <div>WHITE WINS</div>}
    {whiteCheck && legalMoves==0 && <div>BLACK WINS</div>}
    {!whiteCheck && !blackCheck && legalMoves==0 && <div>DRAW</div>}
    <div>Legal moves: {legalMoves}</div>
    {whiteCheck && <div>White Is In CHECK</div>}
    {blackCheck && <div>Black Is In CHECK</div>}
    <button onClick={() => dispatch(resetBoard())}>Reset</button>
    {whiteMove==true && <div>White</div>}
    {whiteMove==false && <div>Black</div>}
    {/*   <div>{board}</div> */}
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