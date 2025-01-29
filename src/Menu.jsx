import './App.css'
import { isKingInCheck,getAllLegalMoves } from './Moves';
import { useDispatch,useSelector } from 'react-redux';
import { changeBoard, resetBoard, setHistMove,flip,play} from './ChessBoardSlice'
import ProgessBar from './ProgessBar'
import GameOver from './GameOver';
function Menu()
{ 
    const dispatch = useDispatch();
    const board = useSelector((state) => state.chessboard.board)
    const whiteMove = useSelector((state) => state.chessboard.whiteMove)
    const whiteCheck = isKingInCheck(board,true);
    const blackCheck = isKingInCheck(board,false);
    const legalMoves = getAllLegalMoves(board,!whiteMove);
    const castlingRights = useSelector((state) => state.chessboard.castlingRights)
    const moves = useSelector((state) => state.chessboard.moves)
    const lastMove = useSelector((state) => state.chessboard.lastMove)
    const histMove = useSelector((state) => state.chessboard.histMove)
    const fen = useSelector((state) => state.chessboard.fen )
    const game = useSelector((state) => state.chessboard.game )
    const noMoves = moves.length-1;
    const flipped =  useSelector((state) => state.chessboard.flipped )
    const evaluation =  useSelector((state) => state.chessboard.evaluation )
    const bestMove =  useSelector((state) => state.chessboard.bestMove )

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
    const flipBoard = () => {
          console.log(flipped); 
          dispatch(flip());
          
          
    }
  return (
    <div className="menu">
        <button className='button' onClick={handleBack}>Back</button>
        <button className='button' onClick={handleNext}>Next</button>
        <button className='button' onClick={flipBoard}>Flip</button>
        <button className='button' onClick={() => dispatch(resetBoard())}>Reset</button>
        <div className='stock'>{evaluation}</div>
        <div className='stock'>{bestMove}</div>
        <button className='button' onClick={() => dispatch(play())} disabled={game}>Play Stockfish</button>
        <ProgessBar></ProgessBar>
        <GameOver></GameOver>
    </div>
  )
}

export default Menu