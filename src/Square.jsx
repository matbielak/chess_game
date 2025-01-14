import React from 'react'
import { useDispatch } from 'react-redux'
import { updateSquare,deleteTemps, enP, castle, changeCastlingRights } from './ChessBoardSlice'
import Piece from './Piece';
import { useDrop } from 'react-dnd';
import { useSelector } from 'react-redux';
import {dropPiece} from './Game';
import { canCastle, canDropPiece, getAllLegalMoves, isCellAttacked ,isDoublePawnMove,isKingInCheck, isPromotion} from './Moves';
const horizontal = [
    'a','b','c','d','e','f','g','h'
];

function Square({row,col,piece}) {
    const piece2 = useSelector((state) => state.chessboard.board[row][col])
    const board = useSelector((state) => state.chessboard.board)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const castlingRights = useSelector((state) => state.chessboard.castlingRights)
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

              if(p=='k' || p=='K'){
                if(Math.abs(c-col)>1){
                  
                  if(p=='k' && whiteMove)
                    return false;
                  
                  if(p=='K' && !whiteMove)
                    return false;
                  console.log("Cheking if castle possible")
                  return canCastle(board,{r:r,c:c},{r:row,c:col},castlingRights);
                }
              }
              
              return canDropPiece(payload,board,whiteMove)
            },
            drop: (item) => {
                const {r,c,p} = item;
                const newPiece = isPromotion(r,row,p) ? (whiteMove ? 'Q' : 'q') : p;
                const enPassant = piece2 == 't' && (p == 'P' || p == 'p');
                if(enPassant){
                  const direction = p=='p' ? 1 : -1;
                  dispatch(enP([row-direction,col]))
                }
                const updateTempRow = whiteMove ? 2 : 5;
                for(let i=0;i<=7;i++)
                  dispatch(deleteTemps([updateTempRow,i]))

                if(isDoublePawnMove(r,row,p)){
                  const direction = p=='p' ? 1 : -1;
                  const pi = 't';
                  const payload = {
                    from:{
                        r:r,
                        c:c,
                    },
                    to:{
                        r:r+direction,
                        c:col,
                    },
                    piece: pi,

                  };
                  dispatch(updateSquare(payload));
                  
                }
                const payload = {
                    from:{
                        r:r,
                        c:c,
                    },
                    to:{
                        r:row,
                        c:col,
                    },
                    piece: newPiece

                };
                if(p=='r' && r==0 && c==0){
                  dispatch(changeCastlingRights(0))
                }
                if(p=='r' && r==0 && c==7){
                  dispatch(changeCastlingRights(1))
                }
                if(p=='R' && r==7 && c==0){
                  dispatch(changeCastlingRights(2))
                }
                if(p=='R' && r==7 && c==7){
                  dispatch(changeCastlingRights(3))
                }

                if(p=='K' || p=='k'){
                  console.log("King is moving");
                  
                  if(Math.abs(c-col)> 1){
                    if(r==7 && row==7 && c==4 && col==6){
                      console.log("White castles kingside")
                      dispatch(castle(3))
                    }
                     
                    if(r==7 && row==7 && c==4 && col==2){
                      console.log("White castles queenside")
                      dispatch(castle(2))
                    }
                      
                    if(r==0 && row==0 && c==4 && col==6){
                      console.log("Black castles kingside")
                      dispatch(castle(1))
                    }
                      
                    if(r==0 && row==0 && c==4 && col==2){
                       console.log("Black castles queenside")
                       dispatch(castle(0))
                    }
                      
                    return;
                  }
                  else{
                    if(p=='k'){
                      dispatch(changeCastlingRights(0));
                      dispatch(changeCastlingRights(1));
                    }
                    else{
                      dispatch(changeCastlingRights(2));
                      dispatch(changeCastlingRights(3));
                    }
                  }
                }

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
        }),[row,col,piece2,whiteMove,board,castlingRights])

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