import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import "./styles/main.css"
import App from './App.jsx'

const initialData = window.__INITIAL_DATA__ || {}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App initialData={initialData} />
    </BrowserRouter>
  </StrictMode>,
)
