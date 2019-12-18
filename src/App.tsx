import * as React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import './style/global.scss';
import { theme } from './Theme';
import { ThemeProvider, Box } from '@material-ui/core';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default" color="text.primary" id="root-box">
        <Routes />
      </Box>
    </ThemeProvider>
  );
};

export default { App };

render(<App />, document.getElementById('root'));
