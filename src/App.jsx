import './App.css'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Header from './compoents/header';
const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6750A40D",
    },
  },
  typography: {
    fontFamily: "Inter",
    fontStyle: "normal",
    h1: {
      fontSize: 20,
      fontWeight: 500,
    },
    h2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.1,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
  },
  spacing: 8,
});

function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <Header />
    </ThemeProvider>
  )
}

export default App
