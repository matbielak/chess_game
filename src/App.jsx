import { DndProvider } from 'react-dnd'
import './App.css'
import Board from './Board'

import { HTML5Backend } from 'react-dnd-html5-backend'
import Menu from './Menu'

function App() {

  return (
    <>

    <DndProvider backend={HTML5Backend}>
      {/* <EndGame>

      </EndGame> */}
      <div className='container'>
        <Menu/>
        <Board/>
      </div>
      
    </DndProvider>
      
    </>
  )
}

export default App
