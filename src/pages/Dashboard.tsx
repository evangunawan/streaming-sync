import * as React from 'react';
import { SpotifyAPI } from '../api/SpotifyAPI';
import Cookie from 'universal-cookie';
import { Button, Box, Divider } from '@material-ui/core';
import { YoutubeAPI } from '../api/YoutubeAPI';

export default class Dashboard extends React.Component {

  state = {
    spotify_loggedIn: false,
    youtube_loggedIn: false,
    spotifyAccount: null,
    youtubeAccount: null,
  }  

  spotifyLogin(){
    SpotifyAPI.authenticate()
  }

  youtubeLogin(){
    YoutubeAPI.authenticate();
  }

  componentDidMount(){
    const cookie = new Cookie();
    const spotify_token = cookie.get('spotify_access_token');
    const youtube_token = cookie.get('youtube_access_token');
    if(spotify_token){
      this.setState({spotify_loggedIn : true});
      this.getSpotifyAccountInfo();
    }

    if(youtube_token) {
      this.setState({youtube_loggedIn : true});
      this.getYoutubeAccountInfo();
    }
  }

  async getSpotifyAccountInfo(){
    const userData = await SpotifyAPI.getAccountInfo();
    this.setState({ spotifyAccount: userData });
  }
  
  async getYoutubeAccountInfo(){
    const userData = await YoutubeAPI.getAccountInfo();
    this.setState({ youtubeAccount: userData.items[0].snippet });
  }

  renderAccountInfo(){
    const { spotifyAccount, spotify_loggedIn, youtubeAccount, youtube_loggedIn } = this.state;
    // if(!spotify_loggedIn) return <p>Not Logged In</p>
    // if(!spotifyAccount) return <p>Loading...</p>
    let spotifyDisplay = '';
    let youtubeDisplay = '';
    (!spotifyAccount) ? spotifyDisplay = 'Please wait...' : spotifyDisplay = this.state.spotifyAccount.display_name;
    (!youtubeAccount) ? youtubeDisplay = 'Please wait...' : youtubeDisplay = this.state.youtubeAccount.title;
    if(!spotify_loggedIn) spotifyDisplay = 'Not Logged In';
    if(!youtube_loggedIn) youtubeDisplay = 'Not Logged In';

    return(
      <div className="user-info">
        <span><i className="fab fa-spotify"></i> {spotifyDisplay}</span>
        <span><i className="fab fa-youtube"></i> {youtubeDisplay}</span>
      </div>
    )
  }

  render(){
    return(
      <div id="page-dashboard">
        <div className="button-group">
          <Button variant="contained" color="primary" onClick={(ev)=>this.spotifyLogin()} disabled={this.state.spotify_loggedIn}>Spotify Login</Button>
          <Button variant="contained" color="primary" onClick={(ev)=>this.youtubeLogin()} disabled={this.state.youtube_loggedIn}>Youtube Login</Button>
          {this.renderAccountInfo()}
        </div>
        <Divider />
        <div className="content">

        </div>
      </div>
    );
  }
}