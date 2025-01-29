import { useSelector } from "react-redux"
import { getAllLegalMoves } from "./Moves";
import { useEffect, useState } from "react";
import { isKingInCheck } from "./Moves";
function GameOver() {
    const board = useSelector((state) => state.chessboard.board)
    const whiteCheck = isKingInCheck(board,true);
    const blackCheck = isKingInCheck(board,false);
    
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const legalMoves = getAllLegalMoves(board,!whiteMove);
    const [white,setWhite] = useState(false);
    const [black,setBlack] = useState(false);
    const [draw,setDraw] = useState(false);
    useEffect(()=>{
        console.log(whiteCheck,blackCheck,whiteMove,legalMoves);
        
         setWhite(blackCheck && !whiteMove && legalMoves===0)
         setBlack( whiteCheck &&  whiteMove && legalMoves === 0)
         setDraw(!whiteCheck && !blackCheck && legalMoves === 0)
    },[whiteCheck,blackCheck,whiteMove,legalMoves])
    
  return (
    <div className="gameover">
        {white && <div>WHITE WINS</div>}
        {black && <div>BLACK WINS</div>}
        {draw && <div>DRAW</div>}
        {!white && !black && !draw && <div>Game in progess...</div>}
    </div>
    
  )
}

export default GameOver