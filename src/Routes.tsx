import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './pages/Home';
// import Hello from './pages/Hello';
import { Home, Hello } from './pages/index';
import { render } from 'react-dom';

export default class Routes extends React.Component {

  render(){
    return(
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={ Home } />
            <Route path="/test" component={ Hello } />
          </Switch>
        </Router>
      </div>
    )
  }
}
