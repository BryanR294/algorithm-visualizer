import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './Static/index.css'
import App from './Components/App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
