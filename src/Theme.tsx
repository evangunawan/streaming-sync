import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: deepOrange,
    secondary: blue,
  },
  typography: {
    fontFamily: [
      'Roboto', 
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  }
});

export { theme };