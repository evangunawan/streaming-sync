import * as React from 'react';
import GoogleLogin from 'react-google-login';
import ApiClient from '../api/ApiClient';

export default class Hello extends React.Component {
  state = {
    access_token: '',
  }
  
  apiClient: ApiClient = null;

  search(){
    this.apiClient.ytSearch('indonesia', 5);
    
  }

  render() {
    const responseGoogle = (response) => {
      this.setState({access_token: response.accessToken});
      this.apiClient = new ApiClient(this.state.access_token);
      
      console.log(response);
    }
    return(
      <div>
        <h3>It works</h3>
        <GoogleLogin clientId="613891810766-g457r0sia00kssn3j8i9342v7a4rm28e.apps.googleusercontent.com"
          buttonText="Login Google" 
          onSuccess={responseGoogle}
          onFailure={responseGoogle}/>
        <p>Your access token: {this.state.access_token}</p>
        <button onClick={(ev)=>this.search()}>Search Youtube</button>
      </div>
    );
  }
}