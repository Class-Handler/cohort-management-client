import { useState } from "react";
import projectService from "../../services/project.services";

const CreateProject = ({ cohortId, getCohort, getProject, allStudents }) => {
  const [project, setProject] = useState({
    projectType: null,
    preferencesNumber: 8,
    blockedNumber: 3,
    partecipants: allStudents.map(el => el._id),
    cohortId: cohortId,
  });
  const [togglePartecipants, setTogglePartecipants] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProject((values) => ({ ...values, [name]: value }));
  };

  const handlePartecipants = (e) => {
    if (e.target.checked) {
      const selectedPartecipantsList = [...project.partecipants, e.target.value];
      setProject((prev) => ({...prev, partecipants: selectedPartecipantsList}));
    } else {
      const selectedPartecipantsList = project.partecipants.filter((el) => el !== e.target.value);
      setProject((prev) => ({...prev, partecipants: selectedPartecipantsList}));
    }
  };

  const createProject = async (e) => {
    e.preventDefault();

    try {
      const response = await projectService.createProject(cohortId, project);
      alert("Project created"); // needs to be changed
      getCohort();
      getProject(response.data._id)
    } catch (err) {
      setErrorMessage(err.response.data.message);
    }
  };

  return (
    <div className="CreateProject card p-2">
      <form onSubmit={createProject} className="form">
        <div className="d-flex justify-content-evenly mb-3 ">
          <div className="form-check m-1">
            <label className="form-check-label m-1">
              Project 2
              <input
                className="form-check-input m-1"
                type="radio"
                name="projectType"
                value="Project 2"
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-check-label m-1">
              Final Project
              <input
                className="form-check-input m-1"
                type="radio"
                name="projectType"
                value="Final Project"
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-check-label m-1">
              Mini Project Mod 1
              <input
                className="form-check-input m-1"
                type="radio"
                name="projectType"
                value="Mini Project Mod 1"
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-check-label m-1">
              Mini Project Mod 2
              <input
                className="form-check-input m-1"
                type="radio"
                name="projectType"
                value="Mini Project Mod 2"
                onChange={handleChange}
                required
              />
            </label>
            <label className="form-check-label m-1">
              Mini Project Mod 3
              <input
                className="form-check-input m-1"
                type="radio"
                name="projectType"
                value="Mini Project Mod 3"
                onChange={handleChange}
                required
              />
            </label>
          </div>
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <label className="form-label">Number of preferences (5-9):
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
          </label>
        </div>

        <div className="mb-3 d-flex justify-content-center">
          <label className="form-label">
            Number of Not preferences (max 4):
          <input
            type="number"
            name="blockedNumber"
            value={project.blockedNumber}
            onChange={handleChange}
            className="form-control"
            min={0}
            max={4}
            required
          />
          </label>
        </div>

        <div className="mb-4 d-flex justify-content-center">
          <label className="form-label me-3">Partecipants:</label>

          {!togglePartecipants && (
            <div
              onChange={() => {
                setTogglePartecipants(!togglePartecipants);
                setProject((prev) => ({ ...prev, partecipants: [] }));
              }}
            >
              <div className="form-check">
                <label className="form-check-label text-uppercase">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultChecked
                  />
                  All students
                </label>
              </div>

              <div className="form-check">
                <label className="form-check-label">
                  <input className="form-check-input" type="checkbox" />
                  Select manually
                </label>
              </div>
            </div>
          )}

          {togglePartecipants && (
            <ul className="list-unstyled">
              <li className="form-check">
                <label className="form-check-label text-uppercase">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={(e) => {
                      setTogglePartecipants(!togglePartecipants);
                      setProject((prev) => ({
                        ...prev,
                        partecipants: allStudents.map((el) => el._id),
                      }));
                    }}
                  />
                  All students
                </label>
              </li>
              {allStudents.map((student) => {
                return (
                  <li className="text-capitalize form-check" key={student._id}>
                    <label className="form-check-label">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value={student._id}
                        onChange={handlePartecipants}
                      />

                      {student.studentName}
                    </label>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {errorMessage && (
          <p className="error-message text-uppercase">- {errorMessage} -</p>
        )}

        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-dark">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProject;
