import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  // <StrictMode> //Turned off to prevent Python libraries to load two times
    <App />
  // </StrictMode>
)
