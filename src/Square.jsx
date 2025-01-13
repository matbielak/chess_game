import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSquare } from './ChessBoardSlice'
import Piece from './Piece';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import {dropPiece} from './Game';
import { canDropPiece, getAllLegalMoves, isCellAttacked ,isKingInCheck} from './Moves';
const horizontal = [
    'a','b','c','d','e','f','g','h'
];

function Square({row,col,piece}) {
    const piece2 = useSelector((state) => state.chessboard.board[row][col])
    const board = useSelector((state) => state.chessboard.board)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const dispatch = useDispatch();
    const [{isOver,canDrop},drop] = useDrop(()=>({
            accept: 'piece',
            canDrop: (item)=>{
              const {r,c,p} = item;
              // if(r==row && c==col)
              //   return false;
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
              
              return canDropPiece(payload,board,whiteMove)
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

               // console.log(payload)
               
                dispatch(updateSquare(payload));
                const legal = getAllLegalMoves(board,whiteMove);
                console.log(`Legal Moves:${legal}`)
               // console.log(`From ${p}${horizontal[c]}${7-r+1} To ${piece2}${horizontal[col]}${7-row+1}`);
                
                
            },
            collect: (monitor) => ({
                isOver: !!monitor.isOver(),
                canDrop: !!monitor.canDrop(),
            })
        }),[row,col,piece2,whiteMove,board])

        const handleClick = () =>{
            console.log(`${row} ${col} attacked: ${isCellAttacked(row,col,board,whiteMove)} by ${whiteMove ? `black` : `white`}`);
        }
        
  return (
    <div
    ref={drop}
    onClick={handleClick}
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