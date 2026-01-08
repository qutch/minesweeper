import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GameGrid } from './game.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameGrid />
  </StrictMode>,
)
