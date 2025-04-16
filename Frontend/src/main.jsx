import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './style.css';
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import Theme from './Theme.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={Theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>  
    </ThemeProvider>
  </StrictMode>,
)
