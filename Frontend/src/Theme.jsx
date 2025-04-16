import { createTheme } from '@mui/material'
import React from 'react'

const Theme = createTheme({
  palette: {
    primary: {
      main: '#1db954',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#f4f4f4',
      white: '#ffffff',
    },
    text: {
      primary: '#1d1d1d',
      secondary: '#666666',
    },
    common: {
      black: '#000000',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 600,
    },
    h2: {
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
})

export default Theme