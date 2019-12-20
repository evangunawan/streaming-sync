import * as React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default class YoutubeLanding extends React.Component {
  state = {
    token: '',
  };

  constructor(props) {
    super(props);

    const codereq = this.getHashValue('access_token');
    const cookie = new Cookies();
    const d = new Date();
    d.setMonth(d.getMonth() + 1);

    cookie.set('youtube_access_token', codereq, { path: '/', expires: d });
    this.state = {
      token: codereq,
    };
  }

  getHashValue(key) {
    var matches = location.hash.match(new RegExp(key + '=([^&]*)'));
    return matches ? matches[1] : null;
  }

  render() {
    const { token } = this.state;
    if(!token) return <div>Please wait...</div>
    return (
      <div>
        <p>Please wait, this window will automatically closed.</p>
        <Redirect to='/dashboard'/>
      </div>
    );
  }
}
