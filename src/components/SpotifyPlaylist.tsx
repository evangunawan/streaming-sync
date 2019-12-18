import * as React from 'react';
import { SpotifyAPI } from '../api/SpotifyAPI';
import { Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, CircularProgress } from '@material-ui/core';
import { Sync } from '@material-ui/icons';
import Cookies from 'universal-cookie';

interface SyncMethod {
  callback?:any, 
}

class SpotifyPlaylist extends React.Component<SyncMethod> {

  state = {
    account_id: '',
    user_playlists: null,
    youtube_loggedIn: false,
  }

  cookie = new Cookies();

  constructor(props){
    super(props);
    
  }

  async getUserPlaylist(){
    const account = await SpotifyAPI.getAccountInfo();
    const playlist = await SpotifyAPI.getUserPlaylist(account.id);
    console.log(playlist.items);
    this.setState({ 
      account_id: account.id,
      user_playlists: playlist.items,
    });
    
  }

  renderPlaylist(){
    const { user_playlists } = this.state;
    const playlist = user_playlists.map((item,k)=>{
      return(
        <TableRow key={k}>
          <TableCell>{item.name}</TableCell>
          <TableCell>{item.owner.display_name}</TableCell>
          <TableCell>{item.tracks.total}</TableCell>
          <TableCell>
            <IconButton onClick={(ev) => this.props.callback(item)} disabled={!this.state.youtube_loggedIn}><Sync/></IconButton>
          </TableCell>
        </TableRow>
      )
    })
    return playlist;
  }
  
  componentDidMount(){
    this.getUserPlaylist();

    //Check if youtube is logged in or not.
    const youtube_token = this.cookie.get('youtube_access_token');
    if(youtube_token){
      this.setState({youtube_loggedIn: true})
    }
  }

  render(){
    const {user_playlists} = this.state;
    if(!user_playlists) return <div><CircularProgress /></div>
    return (
      <Paper className="spotify-playlist-table">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Playlist Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Tracks</TableCell>
              <TableCell>Sync</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.renderPlaylist()}
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default SpotifyPlaylist;