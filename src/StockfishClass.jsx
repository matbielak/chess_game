export default class StockfishWorker {
  constructor() {
    if (typeof Worker !== "undefined") {
      this.worker = new Worker("/stockfish/stockfish-16.1-lite-single.js");
      this.worker.onmessage = this.handleMessage.bind(this);
      this.listeners = [];
    } else {
      console.error("Web Workers are not supported in this environment.");
    }
  }

  handleMessage(event) {
    var message = event.data;
    // var move = ""
    // if(message === 'readyok'){
    //             console.log("STOCKFISH IS READY");
                
    // }
    if(message.startsWith('bestmove')){
        message = message.split(" ")[1];
    }
    
    this.listeners.forEach((listener) => listener(message));
  }

  addListener(callback) {
    this.listeners.push(callback);
  }

  removeListener(callback) {
    this.listeners = this.listeners.filter((listener) => listener !== callback);
  }

  sendCommand(command) {
    if (this.worker) {
        console.log('Sending command to Stockfish: ',command);
        this.worker.postMessage(command);
    } else {
      console.error("Worker is not initialized.");
    }
  }

  terminate() {
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  }
}