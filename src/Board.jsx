import React from 'react'
import Square from './Square'
import { useSelector, useDispatch } from 'react-redux'
import BoardSquare from './BoardSquare'
import { resetBoard } from './ChessBoardSlice'
function Board() {
     const dispatch = useDispatch();
    const board = useSelector((state) => state.chessboard.board)

  return (
    <>
    <button onClick={() => dispatch(resetBoard())}>Reset</button>
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