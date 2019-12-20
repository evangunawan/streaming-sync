import * as React from 'react';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

export default class SpotifyLanding extends React.Component {
  state = {
    code: '',
  };

  constructor(props) {
    super(props);

    const codereq = this.getHashValue('access_token');
    const cookie = new Cookies();
    const d = new Date();
    d.setMonth(d.getMonth() + 1);

    cookie.set('spotify_access_token', codereq, { path: '/', expires: d });
    this.state = {
      code: codereq,
    };
    
  }

  getHashValue(key) {
    var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
  }

  render() {
    return (
      <div>
        <p>Please wait, this window will automatically closed.</p>
        <Redirect to="/dashboard"/>
      </div>
    );
  }
}
