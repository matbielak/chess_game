import { useEffect, useState } from 'react';

function Stockfish() {
    const [worker,setWorker] = useState(null);
    const [output,setOutput] = useState([]);
    const [isReady,setIsReady] = useState(false);

    useEffect(()=>{
        const stockfishWorker = new Worker("/stockfish/stockfish-16.1-single.js");
        setWorker(stockfishWorker);

        stockfishWorker.onmessage = (event) => {
            const message = event.data;
            console.log('Stockfish says:',message);
            setOutput((prev)=>[...prev,message]);
            if(message === 'readyok'){
                setIsReady(true);
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
  return (
     <>
        <div>Stockfish</div>
        <button onClick={startAnalysis} disabled={isReady}>Start Analysis</button>
        <div>
            <h2>Engine output:</h2>
            <pre style={{maxHeight:'300px', overflowY:'scroll'}}>
                {output.join('\n')}
            </pre>
        </div>
    </>
    
  )
}

export default Stockfish
