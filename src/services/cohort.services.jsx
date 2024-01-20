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

  getStudent = (cohortId, studentId) => {
    return this.api.get(`/api/cohorts/${cohortId}/${studentId}`)
  }

  updateStudentsPairs = (cohortId, arrayStudentsObj) => {
    return this.api.put(`/api/cohorts/${cohortId}/students`, arrayStudentsObj)
  }

  createCohort = (newCohort) => {
    return this.api.post('/api/cohorts', newCohort)
  }

  deleteCohort = (cohortId) => {
    return this.api.delete(`/api/cohorts/${cohortId}`)
  }
}

const cohortService = new CohortService();
 
export default cohortService;