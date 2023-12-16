import axios from 'axios';
 
class OneTimeCodeService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
    });
 
    this.api.interceptors.request.use(config => {

      const storedToken = localStorage.getItem('authToken');
 
      if (storedToken) {
        config.headers = { Authorization: `Bearer ${storedToken}` };
      }
 
      return config;
    });
  }

  getOneTimeCode = (date) => {
    return this.api.post(`/api/project-code`, {date})
  }

  //validateOneTimeCode = 


}

const oneTimeCodeService = new OneTimeCodeService();
 
export default oneTimeCodeService;