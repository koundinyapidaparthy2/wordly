import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import Allroutes from "./routes";
import { store } from "./store/index.js";
import { SnackbarProvider } from "notistack";
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
        <Provider store={store}>
          <SnackbarProvider hideIconVariant>
            <Allroutes />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
