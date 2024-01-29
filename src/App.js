import logo from "./logo.svg";
import Header from "./components/Header";
import Play from "./components/Play";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#000",
      custom: "#fff",
      background: "#000",
      shadow: "rgba(255, 255, 255, 0.3)",
      exact: "#34a852",
      contains: "#f9bc03",
      error: "#00000091",
    },
    secondary: {
      main: "#000",
      background: "#fff",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 450,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});
function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Header />
        <Play />
      </ThemeProvider>
    </div>
  );
}

export default App;
