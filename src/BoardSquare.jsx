import React from 'react'
import Square from './Square'
import { useDrop } from 'react-dnd'
import { useDispatch } from 'react-redux'
import { updateSquare } from './ChessBoardSlice'
function BoardSquare({row,col,piece}) {
     const dispatch = useDispatch();
    

   

  return (
    <div ref={drop} style={{
        width: '100px',
        height: '100px',
        backgroundColor: (row + col) % 2 === 0 ? 'gray' : 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Square row={row} col={col} piece={piece}/>
    </div>
  )
}

export default BoardSquare