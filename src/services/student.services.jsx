import axios from 'axios';
 
class StudentService {
  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || 'http://localhost:5005'
    });
 
    this.api.interceptors.request.use(config => {

      const storedStudentToken = localStorage.getItem('studentToken');
 
      if (storedStudentToken) {
        config.headers = { Authorization: `Bearer ${storedStudentToken}` };
      }
 
      return config;
    });
  }

  validateStudent = (body) => {
    return this.api.post(`/api/students/validation`, body)
  }

  verifyStudent = () => {
    return this.api.get('/api/students/verifyStudent')
  }

  submitPreferences = (studentId, body) => {
    return this.api.put(`/api/students/${studentId}`, body)
  }

}

const studentService = new StudentService();
 
export default studentService;