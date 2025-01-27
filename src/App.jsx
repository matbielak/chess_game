import { DndProvider } from 'react-dnd'
import './App.css'
import Board from './Board'

import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {

  return (
    <>

    <DndProvider backend={HTML5Backend}>
      {/* <EndGame>

      </EndGame> */}
      <Board/>
    </DndProvider>
      
    </>
  )
}

export default App
