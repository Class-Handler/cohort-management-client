import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import cohortService from "../services/cohort.services";
import projectService from "../services/project.services";
import CreateProject from "../components/project-components/CreateProject";
import CohortDetails from "../components/cohort-components/CohortDetails";
import ProjectDetails from "../components/project-components/ProjectDetails";
import StudentDetails from "../components/student-components/StudentDetails";

const CohortPage = () => {
  const [cohort, setCohort] = useState(null);
  const [project, setProject] = useState(null);
  const [student, setStudent] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { cohortId } = useParams();
  const navigate = useNavigate()

  const getCohort = async () => {
    try {
      const response = await cohortService.getCohort(cohortId);
      setCohort(response.data);
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  const getProject = (projectId) => {
    projectService
      .getProject(cohortId, projectId)
      .then((response) => {
        setStudent(null)
        setProject(response.data);
      })
      .catch((err) => {
        setErrorMessage(err.data.message);
      });
  };

  const getStudent = async (studentId) => {
   try {
    const response = await cohortService.getStudent(cohortId, studentId)
    setProject(null)
    setStudent(response.data)
  } catch (err) {
    console.log(err)
    setErrorMessage(err.data.message);
  }
  }

  const deleteCohort = async () => {
    console.log('delete')
    try {
      const response = await cohortService.deleteCohort(cohortId)
      console.log(response)
      alert(response.data.message)
      navigate('/my-cohorts')
    } catch (err) {
      console.log(err)
      setErrorMessage(err.data.message);
    }
  }

  useEffect(() => {
    getCohort();
  }, [cohortId]);

  return (
    <div className="CohortPage">
      {cohort && (
        <div className="row">
        <h4 className="text-uppercase"><u>{cohort.cohortName}</u></h4>

          <div className="col col-7">
            {errorMessage && (
              <p className="error-message text-uppercase">- {errorMessage} -</p>
            )}
            <CohortDetails cohort={cohort} getProject={getProject} setProject={setProject} deleteCohort={deleteCohort} getStudent={getStudent} setStudent={setStudent}/>
          </div>

          <div className="col col-5">
            {!project && !student &&(
              <CreateProject
                cohortId={cohort._id}
                getCohort={getCohort}
                getProject={getProject}
                allStudents={cohort.students}
              />
)}
              {project && <ProjectDetails
                project={project}
                cohortId={cohort._id}
                getProject={getProject}
              />}

              {student && <StudentDetails student={student} />}
            
          </div>

        </div>
      )}
    </div>
  );
};

export default CohortPage;
