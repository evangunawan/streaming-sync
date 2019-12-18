import * as React from 'react';
import {
  Paper,
  AppBar,
  Toolbar,
  Typography,
  Button,
  CircularProgress,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Box,
  TableBody,
} from '@material-ui/core';
import { SpotifyAPI } from '../api/SpotifyAPI';

interface ModalProps {
  playlist: Object;
  close?: any;
}

class SyncModal extends React.Component<ModalProps> {
  state = {
    target_playlist: null,
    playlist: null, //this is the playlist details object.
    syncing: false,
  };

  constructor(props: ModalProps) {
    super(props);

    this.state = {
      target_playlist: props.playlist,
      playlist: null,
      syncing: false,
    };
  }

  componentDidMount() {
    this.getPlaylistDetails();
  }

  async getPlaylistDetails() {
    const { target_playlist } = this.state;
    const PLAYLIST_ID = target_playlist.id;
    const playlist = await SpotifyAPI.getPlaylistDetails(PLAYLIST_ID);
    this.setState({ playlist: playlist });

    console.log(playlist);
  }

  renderTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;

    var min_padded = '0000' + mins;
    min_padded = min_padded.substr(min_padded.length - 2);
    var sec_padded = '0000' + secs;
    sec_padded = sec_padded.substr(sec_padded.length - 2);

    return min_padded + ':' + sec_padded;
  }

  renderTrackRows() {
    const { playlist } = this.state;
    const TRACKS: Array<any> = playlist.tracks.items;

    const result = TRACKS.map((item, k) => {
      return (
        <TableRow key={k}>
          <TableCell>{item.track.name}</TableCell>
          <TableCell>{item.track.artists[0].name}</TableCell>
          <TableCell>{item.track.album.name}</TableCell>
          <TableCell>{this.renderTime(item.track.duration_ms)}</TableCell>
        </TableRow>
      );
    });

    return result;
  }

  renderTracks() {
    const { playlist } = this.state;

    if (!playlist)
      return (
        <div>
          <CircularProgress />
        </div>
      );
    return (
      <div className="table-container">
        <Table className="track-table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Artists</TableCell>
              <TableCell>Album</TableCell>
              <TableCell>Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{this.renderTrackRows()}</TableBody>
        </Table>
      </div>
    );
  }

  renderSync() {
    return <div>Tes</div>;
  }

  render() {
    const { target_playlist } = this.state;
    return (
      <div id="sync-modal">
        <Paper className="window">
          <AppBar position="static" className="app-bar">
            <Toolbar>
              <Typography variant="h6" className="window-title">
                {target_playlist.name}
              </Typography>
              <Button color="inherit" onClick={(ev) => this.props.close()}>
                Cancel
              </Button>
              <Button
                color="secondary"
                variant="contained"
                disabled={this.state.syncing}
                onClick={(ev) => {
                  this.setState({ syncing: true });
                }}>
                Sync
              </Button>
            </Toolbar>
          </AppBar>
          {!this.state.syncing ? this.renderTracks() : this.renderSync()}
        </Paper>
      </div>
    );
  }
}

export default SyncModal;
