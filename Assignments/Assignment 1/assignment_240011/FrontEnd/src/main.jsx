import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LNF from './LNF.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LNF />
  </StrictMode>,
)
