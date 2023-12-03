import { useState } from "react";
import projectService from "../../services/project.services";

const CreateProject = ({ cohortId, getCohort, partecipants }) => {
  const [project, setProject] = useState({
    projectType: "Project 2",
    preferencesNumber: 8,
    blockedNumber: 3,
    partecipants: partecipants,
    cohortId: cohortId
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  /* // projectSettings {} for req.body --> {projectType, preferencesNumber, blockedNumber} */

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProject((values) => ({ ...values, [name]: value }));
  };

  const createProject = async (e) => {
    e.preventDefault();
    console.log("PROJ ", project);
    try {
      const response = await projectService.createProject(cohortId, project);
      alert("Project created");
      console.log(response.data);
      getCohort();
    } catch (err) {
      console.log(err);
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="CreateProject">
      <form onSubmit={createProject}>
        <div className="mb-3">
          <div className="form-check m-1">
            <label className="form-check-label m-1">
              Project 2
              <input
                className="form-check-input m-2"
                type="radio"
                name="projectType"
                value="Project 2"
                onChange={handleChange}
              />
            </label>
            <label className="form-check-label m-1">
              Final Project
              <input
                className="form-check-input m-2"
                type="radio"
                name="projectType"
                value="Final Project"
                onChange={handleChange}
              />
            </label>
            <label className="form-check-label m-1">
              Mini Project Mod 2
              <input
                className="form-check-input  m-2"
                type="radio"
                name="projectType"
                value="Mini Project Mod 2"
                onChange={handleChange}
              />
            </label>
            <label className="form-check-label m-1">
              Mini Project Mod 3
              <input
                className="form-check-input  m-2"
                type="radio"
                name="projectType"
                value="Mini Project Mod 3"
                onChange={handleChange}
              />
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Number of preferences (5-9):</label>
          <input
            type="number"
            name="preferencesNumber"
            value={project.preferencesNumber}
            onChange={handleChange}
            className="form-control"
            min={5}
            max={9}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">
            Number of Not preferences (max 4):
          </label>
          <input
            type="number"
            name="blockedNumber"
            value={project.blockedNumber}
            onChange={handleChange}
            className="form-control"
            max={4}
            required
          />
        </div>

          <div className="dropdown mb-3">
            <button
              className="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select partecipants
            </button>
            {/* <ul className="dropdown-menu"> */}
              {project.partecipants.map((student) => {
                return (
                  <li className="dropdown-item" key={student._id}>
                    <div className="form-check">
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={student.studentName}
                      />
                      
                        {student.studentName}
                      </label>
                    </div>
                  </li>
                );
              })}
            {/* </ul> */}
          </div>

        {errorMessage && (
          <p className="error-message text-uppercase">- {errorMessage} -</p>
        )}

        <button type="submit" className="btn btn-dark">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateProject;
