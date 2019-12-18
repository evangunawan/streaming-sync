import Cookies from 'universal-cookie';
import ApiClient from './ApiClient';

class API {
  apiClient = new ApiClient();
  cookie = new Cookies();
  CLIENT_ID =
    '613891810766-g457r0sia00kssn3j8i9342v7a4rm28e.apps.googleusercontent.com';
  API_KEY = process.env.REACT_APP_GAPI_KEY;

  buildQuery(uri, data) {
    let result = [];
    for (let d in data) {
      result.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    }

    const params = result.join('&');

    return `${uri}?${params}`;
  }

  async authenticate() {
    const params = {
      client_id: this.CLIENT_ID,
      response_type: 'token',
      redirect_uri: 'http://localhost:1234/yt-landing',
      scope: 'https://www.googleapis.com/auth/youtube',
      state: 'yt-login',
    };
    let auth_url = this.buildQuery(
      'https://accounts.google.com/o/oauth2/v2/auth',
      params
    );
    const auth_window = window.open(auth_url, '', 'width=600,height=800');

    //keep checking whether if the user successfully logged in to spotify services.
    const checker = setInterval(() => {
      if (auth_window.location.href.includes('access_token')) {
        auth_window.close();
        window.location.reload();
        clearInterval(checker);
      }
    }, 1000);
  }

  async getAccountInfo() {
    const token = this.cookie.get('youtube_access_token');
    let userData;
    try {
      userData = await this.apiClient.reqGet(
        'https://www.googleapis.com/youtube/v3/channels',
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {
            part: 'snippet',
            mine: true,
            key: this.API_KEY,
          },
        }
      );
    } catch (err) {
      console.log('yt user info failed');
      this.cookie.remove('youtube_access_token');
      return null;
    }

    return userData;
  }
}

export const YoutubeAPI = new API();
