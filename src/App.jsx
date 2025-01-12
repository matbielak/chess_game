import { DndProvider } from 'react-dnd'
import './App.css'
import Board from './Board'
import Piece from './Piece'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  

  return (
    <>
    <DndProvider backend={HTML5Backend}>
      <Board/>
    </DndProvider>
      
    </>
  )
}

export default App
