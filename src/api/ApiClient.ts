import axios from 'axios';
export default class ApiClient {

  async reqGet(url, params){
    try {
      const response = await axios.get(url, params);
      
      return response.data;
    } catch (err){
      throw(err);
    }
  }

}