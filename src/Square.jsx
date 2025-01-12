import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSquare } from './ChessBoardSlice'
import Piece from './Piece';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import {dropPiece} from './Game';
const horizontal = [
    'a','b','c','d','e','f','g','h'
];

function Square({row,col,piece}) {
    const piece2 = useSelector((state) => state.chessboard.board[row][col])
    const board = useSelector((state) => state.chessboard.board)
    const dispatch = useDispatch();
    const [{isOver,canDrop},drop] = useDrop(()=>({
            accept: 'piece',
            canDrop: (item)=>{
              const {r,c,p} = item;
              const payload = {
                    from:{
                        r:r,
                        c:c,
                    },
                    to:{
                        r:row,
                        c:col,
                    },
                    piece: p

                };
              
              return dropPiece(payload,board)
            },
            drop: (item) => {
                const {r,c,p} = item;
                const payload = {
                    from:{
                        r:r,
                        c:c,
                    },
                    to:{
                        r:row,
                        c:col,
                    },
                    piece: p

                };
                console.log(payload)
                dispatch(updateSquare(payload));
                console.log(`From ${p}${horizontal[c]}${7-r+1} To ${piece2}${horizontal[col]}${7-row+1}`);
                
                
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),[row,col,piece2])
  return (
    <div
    ref={drop}
      style={{
        width: '100px',
        height: '100px',
        backgroundColor: (row + col) % 2 === 0 ? 'gray' : 'green',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Piece type={piece2} r={row} c={col}/>
    </div>
  )
}

export default Square