import * as React from 'react';
import { SpotifyAPI } from '../api/SpotifyAPI';
import Cookie from 'universal-cookie';
import { Button, Box, Divider } from '@material-ui/core';
import { YoutubeAPI } from '../api/YoutubeAPI';
import SpotifyPlaylist from '../components/SpotifyPlaylist';
import SyncModal from '../components/SyncModal';

export default class Dashboard extends React.Component {
  state = {
    modal_target: null,
    spotify_loggedIn: false,
    youtube_loggedIn: false,
    spotifyAccount: null,
    youtubeAccount: null,
    auth_window_open: false,
  };

  spotifyLogin() {
    window.open(SpotifyAPI.getAuthURL(), '_self');
  }

  youtubeLogin() {
    window.open(YoutubeAPI.getAuthURL(), '_self');
  }

  componentDidMount() {
    const cookie = new Cookie();
    const spotify_token = cookie.get('spotify_access_token');
    const youtube_token = cookie.get('youtube_access_token');

    if (spotify_token) {
      this.setState({ spotify_loggedIn: true });
      this.getSpotifyAccountInfo();
    }

    if (youtube_token) {
      this.setState({ youtube_loggedIn: true });
      this.getYoutubeAccountInfo();
    }

    //Debugging only.
    if (spotify_token || youtube_token) {
      console.log(`Spotify token: ${spotify_token}`);
      console.log(`Youtube token: ${youtube_token}`);
    }
  }

  async getSpotifyAccountInfo() {
    const userData = await SpotifyAPI.getAccountInfo();
    this.setState({ spotifyAccount: userData });
  }

  async getYoutubeAccountInfo() {
    const userData = await YoutubeAPI.getAccountInfo();
    this.setState({ youtubeAccount: userData.items[0].snippet });
  }

  renderSyncModal(playlist: Object) {
    return (
      <div>
        <SyncModal
          playlist={playlist}
          close={() => this.setState({ modal_target: '' })}
        />
      </div>
    );
  }

  renderAccountInfo() {
    const {
      spotifyAccount,
      spotify_loggedIn,
      youtubeAccount,
      youtube_loggedIn,
    } = this.state;
    let spotifyDisplay = '';
    let youtubeDisplay = '';
    !spotifyAccount
      ? (spotifyDisplay = 'Please wait...')
      : (spotifyDisplay = this.state.spotifyAccount.display_name);
    !youtubeAccount
      ? (youtubeDisplay = 'Please wait...')
      : (youtubeDisplay = this.state.youtubeAccount.title);
    if (!spotify_loggedIn) spotifyDisplay = 'Not Logged In';
    if (!youtube_loggedIn) youtubeDisplay = 'Not Logged In';

    return (
      <div className="user-info">
        <span>
          <i className="fab fa-spotify"></i> {spotifyDisplay}
        </span>
        <span>
          <i className="fab fa-youtube"></i> {youtubeDisplay}
        </span>
      </div>
    );
  }

  //TODO: Create LogOut function.

  render() {
    const { modal_target, spotify_loggedIn, auth_window_open } = this.state;
    return (
      <div id="page-dashboard">
        {/* {auth_window_open ? this.openAuthWindow() : null } */}
        {modal_target ? this.renderSyncModal(modal_target) : null}
        <div className="button-group">
          <Button
            variant="contained"
            color="primary"
            onClick={(ev) => this.spotifyLogin()}
            disabled={this.state.spotify_loggedIn}>
            Spotify Login
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={(ev) => this.youtubeLogin()}
            disabled={this.state.youtube_loggedIn}>
            Youtube Login
          </Button>
          {this.renderAccountInfo()}
        </div>
        <Divider />
        <div className="content">
          <h3>Your Spotify Playlists</h3>
          {spotify_loggedIn ? (
            <SpotifyPlaylist
              callback={(playlist) => {
                this.setState({ modal_target: playlist });
              }}
            />
          ) : (
            <div>Not Logged In</div>
          )}
        </div>
      </div>
    );
  }
}
