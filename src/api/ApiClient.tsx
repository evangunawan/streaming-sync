import axios from 'axios';
export default class ApiClient {

  KEY = process.env.REACT_APP_API_KEY;
  ACCESS_TOKEN = '';

  constructor(access_token){
    this.ACCESS_TOKEN = access_token;
  }

  async ytSearch(keyword:string, maxresults:number){
    const param = {
      "part": "snippet",
      "maxResults": maxresults,
      "q": keyword,
      "key": this.KEY,
    }
    this.request('https://www.googleapis.com/youtube/v3/search','get', param);
  }

  async request(url, method, params) {
    try{
      const response = await axios({
        url: url,
        method: method,
        params: params,
      });
      console.log(response);
    } catch(err) {
      console.log('Axios error: ' + err);
    }
  }


}