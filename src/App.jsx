import { DndProvider } from 'react-dnd'
import './App.css'
import Board from './Board'
import Piece from './Piece'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useEffect, useState } from 'react'
import EndGame from './EndGame'
import { defaultSerializeQueryArgs } from '@reduxjs/toolkit/query'
import { isKingInCheck,getAllLegalMoves } from './Moves'
import { useSelector } from 'react-redux'
import Stockfish from './Stockfish'

function App() {

  
    
  return (
    <>

    <DndProvider backend={HTML5Backend}>
      <Stockfish></Stockfish>
      {/* <EndGame>

      </EndGame> */}
      <Board/>
    </DndProvider>
      
    </>
  )
}

export default App
