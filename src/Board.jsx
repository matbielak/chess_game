
import Square from './Square'
import { useSelector, useDispatch } from 'react-redux'
import { changeBoard, resetBoard, setHistMove,flip, updateSquare, setBestMove,setEvalu} from './ChessBoardSlice'
import { isKingInCheck,getAllLegalMoves,fromStockFish,isCastle,getEval} from './Moves'
import { useEffect,useState } from 'react'
function Board() {
  const [worker,setWorker] = useState(null);
      const [output,setOutput] = useState("Output");
      const [isReady,setIsReady] = useState(false);
      const [evalu,setEval] = useState("0.0");
      const [fromS,setFromS] = useState("");
      const [oldFromS,setOldFromS] = useState(0);
      const dispatch = useDispatch();
      const board = useSelector((state) => state.chessboard.board)
      const fen =  useSelector((state) => state.chessboard.fen )
      const whiteMove = useSelector((state) => state.chessboard.whiteMove)
      const whiteCheck = isKingInCheck(board,true);
      const blackCheck = isKingInCheck(board,false);
      const legalMoves = getAllLegalMoves(board,!whiteMove);
      const castlingRights = useSelector((state) => state.chessboard.castlingRights)
      const moves = useSelector((state) => state.chessboard.moves)
      const lastMove = useSelector((state) => state.chessboard.lastMove)
      const histMove = useSelector((state) => state.chessboard.histMove)
      const pgn = useSelector((state) => state.chessboard.pgn )
      const game = useSelector((state) => state.chessboard.game )
      const noMoves = moves.length-1;
      const flipped =  useSelector((state) => state.chessboard.flipped )
      const [oldMove,setOldMove] = useState("")
      useEffect(()=>{
        
            const stockfishWorker = new Worker("/stockfish/stockfish-16.1-lite-single.js");
            setWorker(stockfishWorker);
          
        
  
          stockfishWorker.onmessage = (event) => {
              const message = event.data;
              console.log("GOT MESSAGE",message);
              const {move,evaluation} = getEval(message,whiteMove)
              if(move){
                if(oldMove !== move){
                  setOutput(move);
                  dispatch(setBestMove(move));
                  setOldMove(move);
                  if(game && !whiteMove){
                    console.log("STOCKFISHS TURN");
                    if(game && !whiteMove){
                      const m = fromStockFish(move,board);
                      setTimeout(() => {
                        dispatch(updateSquare(m))
                      }, 2500);
                    }
                    
                  }
                }
                

                
             
               }
              if(evaluation){

                setEval(evaluation);
               // console.log("Eval:",evaluation);
                
               dispatch(setEvalu(evaluation));
              }
              // if(message === 'readyok'){
              //     setIsReady(true);
              //     console.log("STOCKFISH IS READY");
                  
              // }

              // else if(message.startsWith('bestmove')){
              //     const move = message.split(" ")[1];
                  
              //     setOutput(move);
              //     // if(board[from.r][from.c]!='-') {
              //     //   setOutput(move);
              //     // }
              // }
  
              
          };
  
          return () => {
              stockfishWorker.terminate();
          };
  
      },[dispatch,whiteMove,board,game,output,oldMove]);
     
      



  
      // const startAnalysis = () => {
      //     sendCommand('uci');
      //     sendCommand('isready');
          
      //     sendCommand('position startpos');
      //     sendCommand('go depth 10');
      // }
      

    
    
    

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
    const trSqr = (n) => {
      if(flipped) 
        return 7 - n;
      else 
        return n;
    }
        useEffect(()=>{
          const sendCommand = (command) => {
            if(worker){
                console.log('Sending command to Stockfish: ',command);
                worker.postMessage(command);
            }
          };
          const getBestMove = () => {
          sendCommand('uci');
          sendCommand('ucinewgame');
          sendCommand(`position fen ${fen}`);
          sendCommand("go depth 5");
        }
        getBestMove()
      },[fen,worker])

      // useEffect(()=>{
      //   // if(game){
      //   //   console.log("Game");
          
      //   //   if(whiteMove==false && oldFromS===0){
      //   //     setOldFromS(1);
      //   //     setTimeout(() => {
      //   //       console.log("Output:",output);
              
      //   //       const m = fromStockFish(output,board);
      //   //       console.log("GELLLGEGEFF");
              
      //   //       console.log(m)
      //   //       const castle = isCastle(m);
      //   //       console.log("Castle: ",castle);
      //   //       dispatch(updateSquare(m))
      //   //     }, 5000);
            

      //   //   }
      //   //   else if(whiteMove){
          
      //   //     setOldFromS(0);
      //   //   }
      //   // }
        
         

      // },[whiteMove,fen,worker,board,output,dispatch,fromS,oldFromS,game])
  return (
    <>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)'}}>
      {board.map((row, rowIndex) =>
        row.map((square, colIndex) => (
          <Square key={`${rowIndex}-${colIndex}`} row={trSqr(rowIndex)} col={trSqr(colIndex)} piece={square} />
        ))
      )}
    </div>
    </>
     
  )
}

export default Board