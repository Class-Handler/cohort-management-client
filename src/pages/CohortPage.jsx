import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cohortService from "../services/cohort.services";
import projectService from "../services/project.services";
import CreateProject from "../components/project-components/CreateProject";
import CohortDetails from "../components/cohort-components/CohortDetails";
import ProjectDetails from "../components/project-components/ProjectDetails";
import StudentDetails from "../components/student-components/StudentDetails";

const CohortPage = ({showAlert}) => {
  const [cohort, setCohort] = useState(null);
  const [project, setProject] = useState(null);
  const [student, setStudent] = useState(null);

  const { cohortId } = useParams();

  const navigate = useNavigate();

  const getCohort = async () => {
    try {
      const response = await cohortService.getCohort(cohortId);
      setCohort(response.data);
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  const getProject = async (projectId) => {
    try {
      const response = await projectService.getProject(cohortId, projectId);
      setStudent(null);
      setProject(response.data);
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  const getStudent = async (studentId) => {
    try {
      const response = await cohortService.getStudent(cohortId, studentId);
      setProject(null);
      setStudent(response.data);
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  const deleteCohort = async () => {
    try {
      const response = await cohortService.deleteCohort(cohortId);
      console.log(response)
      showAlert(`${response.data.message}`, "success")
      navigate("/my-cohorts");
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  const createProject = async (e, project) => {
    e.preventDefault();

    try {
      const response = await projectService.createProject(cohortId, project);
      showAlert(`${response.data.projectType} successfully created`, "success");
      getCohort();
      getProject(response.data._id);
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  const handleNewProjectButton = () => {
    setProject(null);
    setStudent(null);
  };

  useEffect(() => {
    getCohort();
  }, [cohortId]);

  if (!cohort) {
    return <h1>Loading...</h1>;
  }

  return (
      <CohortDetails
        student={student}
        project={project}
        cohort={cohort}
        getProject={getProject}
        getStudent={getStudent}
        deleteCohort={deleteCohort}
        createProject={createProject}
        handleNewProjectButton={handleNewProjectButton}
      />
  );
};

export default CohortPage;
