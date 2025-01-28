
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
      useEffect(()=>{
          const stockfishWorker = new Worker("/stockfish/stockfish-16.1-lite-single.js");
          setWorker(stockfishWorker);
  
          stockfishWorker.onmessage = (event) => {
              const message = event.data;
              console.log("GOT MESSAGE");
              const {move,evaluation} = getEval(message,whiteMove)
              if(move){
                setOutput(move);
                dispatch(setBestMove(move));
              }
              if(evaluation){

                setEval(evaluation);
                console.log("Eval:",evaluation);
                
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
  
      },[dispatch,whiteMove]);
  
      
  
      // const startAnalysis = () => {
      //     sendCommand('uci');
      //     sendCommand('isready');
          
      //     sendCommand('position startpos');
      //     sendCommand('go depth 10');
      // }
      

    
    
    
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
    const flipBoard = () => {
      console.log(flipped); 
      dispatch(flip());
      
      
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
        if(game){
          if(whiteMove==false && oldFromS===0){
            setOldFromS(1);
            getBestMove()
            
            setTimeout(() => {
              console.log("Output:",output);
              
              const m = fromStockFish(output,board);
              console.log(m)
              setOldFromS(1)
              setFromS(m);
              const castle = isCastle(m);
              console.log("Castle: ",castle);
              dispatch(updateSquare(fromS))
            }, 5000);
            

          }
          else if(whiteMove){
          
            setOldFromS(0);
          }
        }
        
         

      },[whiteMove,fen,worker,board,output,dispatch,fromS,oldFromS,game])
  return (
    <>
    {/* {<div>{toFen(board,whiteMove,castlingRights,pgn.length,lastMove)} </div>} */}
    {/* <div>{output}</div>
    <div>{evalu}</div>
    <div>{fen}</div> */}
    {/* {
      pgn.map((move,idx)=> {
        if(idx%2==0)
          return (idx/2+1) + ". " + move + " ";
        return move + " "; 
      })
    } */}
    {/* <button onClick={handleBack}>Back</button>
    <button onClick={handleNext}>Next</button>
    <button onClick={flipBoard}>Flip</button>*/}
    {/* <div>{castlingRights}</div> */}
    {/* {blackCheck && legalMoves==0 && <div>WHITE WINS</div>} */}
    {/* {whiteCheck && legalMoves==0 && <div>BLACK WINS</div>} */}
    {/* {!whiteCheck && !blackCheck && legalMoves==0 && <div>DRAW</div>} */}
    {/* <div>Legal moves: {legalMoves}</div> */}
    {/* {whiteCheck && <div>White Is In CHECK</div>} */}
    {/* {blackCheck && <div>Black Is In CHECK</div>} */}
    {/* <button onClick={() => dispatch(resetBoard())}>Reset</button> */}
    {/* {whiteMove==true && <div>White</div>} */}
    {/* {whiteMove==false && <div>Black</div>} */} 
      {/* <div>{board}</div> */}
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