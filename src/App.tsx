import * as React from 'react';
import { render } from 'react-dom';
import Routes from './Routes';
import './style/global.scss';

const App = () => {
  return(
    <div>
      <Routes/>
    </div>
  );
}

export default { App }

render(<App/>, document.getElementById('root'));