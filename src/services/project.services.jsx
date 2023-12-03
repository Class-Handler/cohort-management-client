import axios from 'axios';
 
class ProjectService {
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

  createProject = (cohortId, newProject) => {
    return this.api.post(`/api/projects/${cohortId}`, newProject)
  }

  getProject = (cohortId, projectId) => {
    return this.api.get(`/api/projects/${cohortId}/${projectId}`)
  }

  updateProject = (cohortId, projectId, updatedProject) => {
    return this.api.put(`/api/projects/${cohortId}/${projectId}`, updatedProject)
  }

  deleteProject = (cohortId, projectId) => {
    return this.api.delete(`/api/projects/${cohortId}/${projectId}`)
  }

  getOneTimeCode = (date) => {
    return this.api.post(`/api/project-code`, {date})
  }

}

const projectService = new ProjectService();
 
export default projectService;