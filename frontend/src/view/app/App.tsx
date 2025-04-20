import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { observer } from 'mobx-react-lite';

import { appModel } from './model';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgba(0, 0, 0, 0.9)', // Основной цвет (например, светло-голубой)
      contrastText: 'rgba(255, 255, 255, 0.9)', // Контрастный текст для primary
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
      `,
    },
  },
});

export const App = observer(function App() {
  const { dialog, router } = appModel;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {router.Component}
      {dialog.Component}
    </ThemeProvider>
  );
});
