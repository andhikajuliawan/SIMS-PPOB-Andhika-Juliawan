import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
      contrastText: '#fff',
    },
    secondary: {
      main: '#757575',
    },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;