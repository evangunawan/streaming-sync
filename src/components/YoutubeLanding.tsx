import * as React from 'react';
import Cookies from 'universal-cookie';

export default class YoutubeLanding extends React.Component {
  state = {
    token: '',
  };

  constructor(props) {
    super(props);

    const codereq = this.getHashValue('access_token');
    const cookie = new Cookies();

    this.state = {
      token: codereq,
    };

    cookie.set('youtube_access_token', codereq, { path: '/' });
  }

  getHashValue(key) {
    var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
  }

  render() {
    return (
      <div>
        <p>Returned: {this.state.token}</p>
        <p>Please wait, this window will automatically closed.</p>
      </div>
    );
  }
}
