import { useState } from "react";
import projectService from "../../services/project.services";


const CohortDetails = ({ cohort }) => {
  const [project, setProject] = useState(null);
  const [expDate, setExpDate] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getProject = (projectId) => {
    projectService
      .getProject(cohort._id, projectId)
      .then((response) => {
        setProject(response.data);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      });
  };

  const openPreferences = async (e) => {
    e.preventDefault();

    try {
      const code = await projectService.getOneTimeCode(expDate);
      console.log("CODE", code.data);
      const body = {
        preferencesOpen: true,
        oneTimeId: code.data,
      };
      updateProject(body);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.message);
    }
  };

  const updateProject = async (body) => {
    try {
      const updatedProject = await projectService.updateProject(
        cohort._id,
        project._id,
        body
      );
      setProject(updatedProject.data);
    } catch (err) {
      console.log(err);
      setErrorMessage(err.data.message);
    }
  };

  return (
    <>
      <h4>{cohort.cohortName}</h4>

      {cohort.projects.sort().map((project) => {
        return (
          <div key={project._id}>
            <button
              className="btn btn-light"
              onClick={() => {
                getProject(project._id);
              }}
            >
              {project.projectType}
            </button>
          </div>
        );
      })}
      {project && (
        <>
          {project.oneTimeId && (
            <>
              <h4>{project.oneTimeId.uuId}</h4>
              <p>{project.oneTimeId.expirationDate}</p>
            </>
          )}
          {!project.preferencesOpen && (
            <form
              onSubmit={(e) => {
                openPreferences(e);
              }}
            >
              <input
                type="datetime-local"
                required
                onChange={(e) => {
                  setExpDate(e.target.value);
                }}
              />
              <button className="btn btn-dark" type="submit">
                Open student preferences
              </button>
            </form>
          )}

          {project.partecipants.map((student) => {
            return <p key={student._id}>{student.studentName}</p>;
          })}
        </>
      )}

      {errorMessage && (
        <p className="error-message text-uppercase">- {errorMessage} -</p>
      )}
    </>
  );
};

export default CohortDetails;
