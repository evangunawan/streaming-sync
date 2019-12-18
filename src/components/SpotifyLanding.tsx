import * as React from 'react';
import Cookies from 'universal-cookie';

export default class SpotifyLanding extends React.Component {
  state = {
    code: '',
  };

  constructor(props) {
    super(props);
    // const codereq = new URLSearchParams(props.location.search);
    const codereq = this.getHashValue('access_token');
    const cookie = new Cookies();

    this.state = {
      code: codereq,
    };
    cookie.set('spotify_access_token', codereq, { path: '/' });
  }

  getHashValue(key) {
    var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
  }

  render() {
    return (
      <div>
        <p>Returned: {this.state.code}</p>
        <p>Please wait, this window will automatically closed.</p>
      </div>
    );
  }
}
