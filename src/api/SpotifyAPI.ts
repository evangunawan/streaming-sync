import ApiClient from './ApiClient';
import Cookies from 'universal-cookie';

class API {
  cookie = new Cookies();
  apiClient = new ApiClient();
  CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT;
  SECRET = process.env.REACT_APP_SPOTIFY_SECRET;

  buildQuery(uri,data){
    let result = [];
    for (let d in data){
      result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }

    const params = result.join('&');

    return `${uri}?${params}`;
  }
  
  async authenticate(){
    const params = {
      client_id: this.CLIENT_ID,
      response_type: 'token',
      redirect_uri: 'http://localhost:1234/spotify-landing',
      scope: 'user-read-email user-read-private playlist-read-collaborative playlist-read-private user-library-read',
    }
    let auth_url = this.buildQuery('https://accounts.spotify.com/authorize', params);
    const auth_window = window.open(auth_url,'','width=400,height=600');

    //keep checking whether if the user successfully logged in to spotify services.
    const checker = setInterval(()=>{
      if(auth_window.location.href.includes('access_token')){
        auth_window.close();
        window.location.reload();
        clearInterval(checker);
      }
    },1000);
  }

  async getAccountInfo(){
    const token = this.cookie.get('spotify_access_token');
    let userData;
    try{
      userData = await this.apiClient.reqGet('https://api.spotify.com/v1/me', { headers: { 'Authorization' : `Bearer ${token}`}})
    } catch (err) {
      this.cookie.remove('spotify_access_token');
      window.location.reload();
      return null;
    }
    return userData;
  }

}

export const SpotifyAPI = new API();