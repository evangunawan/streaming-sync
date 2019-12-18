import * as React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './pages/Home';
// import Hello from './pages/Hello';
import { Home, Dashboard } from './pages/index';
import { render } from 'react-dom';
import SpotifyLanding from './components/SpotifyLanding';
import YoutubeLanding from './components/YoutubeLanding';

export default class Routes extends React.Component {
  render() {
    const spotifyCallback = () => {};

    return (
      <div>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/yt-landing/" component={YoutubeLanding} />
            <Route path="/spotify-landing/" component={SpotifyLanding} />
          </Switch>
        </Router>
      </div>
    );
  }
}
