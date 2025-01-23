import { useSelector } from "react-redux";
import { isKingInCheck,getAllLegalMoves } from "./Moves";
import { useState } from "react";

function EndGame({isOpen,onClose,endgame}) {
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const board = useSelector((state)=> state.chessboard.board)
    const whiteCheck = isKingInCheck(board,true);
    const blackCheck = isKingInCheck(board,false);
    const legalMoves = getAllLegalMoves(board,!whiteMove);
    const [isEndGameOpen, setEndGameOpen] = useState(false);
    const [text, setText] = useState("Hello");

    const blackWins = whiteCheck && legalMoves==0;
    const whiteWins = blackCheck && legalMoves==0;
    const draw = !whiteCheck && !blackCheck && legalMoves == 0;
    const closeModal = () => 
      {
        console.log("close");
        
        setEndGameOpen(false);
      }
    const openEG = (blackWins,whiteWins,draw) => {
      if(blackWins || whiteWins || draw){
            console.log("END GAME")
            setEndGameOpen(true);
            if(blackWins){
              setText("BLACK WINS") 
            }
            else if(whiteWins){
              setText("WHITE WINS")
            }
            else if(draw){
              setText("DRAW")
            }
             return true;
          }
          return false;
         
    }
    if(!openEG(whiteWins,blackWins,draw))
        return null;
  return ( 
    <div className='endgame-ol' onClick={closeModal}>
        {text}
        <div className='endgame-c' onClick={(e) => e.stopPropagation()}>
            <button className='endgame-close' onClick={closeModal}>
                Close
            </button>
        </div>
    </div>
  )
}

export default EndGame