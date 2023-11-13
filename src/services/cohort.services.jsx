import axios from 'axios';
 
class CohortService {
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

  getCohorts = () => {
    return this.api.get('/api/cohorts')
  }

  getCohort = (cohortId) => {
    return this.api.get(`/api/cohorts/${cohortId}`)
  }

  createCohort = (newCohort) => {
    return this.api.post('/api/cohorts', newCohort)
  }
}

const cohortService = new CohortService();
 
export default cohortService;