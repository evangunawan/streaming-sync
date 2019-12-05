import * as React from 'react';
import { Redirect } from 'react-router-dom';

export default class SpotifyLanding extends React.Component {

  state = {
    code :'',
  };

  constructor(props){
    super(props);
    const codereq = new URLSearchParams(props.location.search);
    this.state = {
      code: codereq.get('code'),
    }
  }
  
  render() {
    return(
      <div>
        Returned: {this.state.code}
        <Redirect to="/"/>
      </div>
    )
  }
}