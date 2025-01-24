import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
function Stockfish() {
    const [worker,setWorker] = useState(null);
    const [output,setOutput] = useState("Output");
    const [isReady,setIsReady] = useState(false);
    const fen =  useSelector((state) => state.chessboard.fen )
    useEffect(()=>{
        const stockfishWorker = new Worker("/stockfish/stockfish-16.1-single.js");
        setWorker(stockfishWorker);

        stockfishWorker.onmessage = (event) => {
            const message = event.data;
           // console.log('Stockfish says:',message);
          //  setOutput((prev)=>[...prev,message]);
            if(message === 'readyok'){
                setIsReady(true);
            }
            else if(message.startsWith('bestmove')){
                const move = message.split(" ")[1];
                setOutput(move);
            }

            
        };

        return () => {
            stockfishWorker.terminate();
        };

    },[]);

    const sendCommand = (command) => {
        if(worker){
            console.log('Sending command to Stockfish: ',command);
            worker.postMessage(command);
        }
    };

    const startAnalysis = () => {
        sendCommand('uci');
        sendCommand('isready');
        sendCommand('ucinewgame');
        sendCommand('position startpos');
        sendCommand('go depth 10');
    }
    const getBestMove = () => {
        sendCommand(`position fen ${fen}`)
        sendCommand("go depth 15")
    }
  return (
     <>
        <div>Stockfish</div>
        <button onClick={startAnalysis} disabled={isReady}>Start Analysis</button>
        <button onClick={getBestMove} disabled={isReady}>Get Best Move</button>
        <div>
            <h2>Engine output:</h2>
            <pre style={{maxHeight:'300px', overflowY:'scroll'}}>
                {output}
            </pre>
        </div>
    </>
    
  )
}

export default Stockfish
