import axios from 'axios';
 
class StudentService {
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

  validateStudent = (code, studentName) => {
    return this.api.get(`/api/students?code=${code}&studentName=${studentName}`)
  }

}

const studentService = new StudentService();
 
export default studentService;