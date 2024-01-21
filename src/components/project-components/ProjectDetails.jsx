import { useState } from "react";
import projectService from "../../services/project.services";

const ProjectDetails = ({ project, getProject, cohortId }) => {
  const [expDate, setExpDate] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  console.log('project', project)

  const openPreferences = async (e) => {
    e.preventDefault();
    try {
      const code = await projectService.getOneTimeCode(expDate);
      const body = { oneTimeId: code.data };
      updateProject(body);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProject = async (body) => {
    try {
      const updatedProject = await projectService.updateProject(
        cohortId,
        project._id,
        body
      );
      getProject(updatedProject.data._id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {project && (
        <>
          <h5>{project.projectType}</h5>
          <div className="row form-control mb-2">
            <label className="col col-6">
              Preferences to submit:
              <input
                type="number"
                name="preferencesNumber"
                value={project.preferencesNumber}
                min={5}
                max={9}
                disabled={isEditing ? false : true}
              />
            </label>
            <label className="col col-6">
              Max to block:
              <input
                type="number"
                name="blockedNumber"
                value={project.blockedNumber}
                min={0}
                max={4}
                disabled={isEditing ? false : true}
              />
            </label>
          </div>

          <div className="row form-control mb-2">
            {project.partecipants.map((student) => {
              return (
                <div
                  key={student._id}
                  className="d-flex justify-content-between btn btn-light btn-sm mb-1 text-capitalize"
                >
                  <span>{student.studentName} </span>
                  {project.partecipantsPreference.includes(student._id) && <span>🔹</span>}
                  {isEditing && (
                    <span
                      className="text-danger"
                      // onClick={() => {removePartecipant(student._id)}}
                    >
                      ❌
                    </span>
                  )}
                </div>
              );
            })}

            {isEditing && (
              <div className="d-flex justify-content-between btn btn-outline-primary btn-sm mb-1">
                <span>Add Student</span>
                <span>➕</span>
              </div>
            )}
          </div>

          <div className="row form-control mb-2">
            {project.oneTimeId ? (
              <>
                <b>{project.oneTimeId.uuId}</b>
                <p>
                  Expire:{" "}
                  <small>
                    {new Date(project.oneTimeId.expirationDate).toLocaleString("en-GB")}
                  </small>
                </p>
                {project.partecipantsPreference.leght ? (
                  <p>
                    Preferences received: {project.partecipantsPreference.leght}{" "}
                    / {project.partecipants.leght}
                  </p>
                ) : (
                  <p>No preferences received yet.</p>
                )}
              </>
            ) : (
              <form
                onSubmit={(e) => {
                  openPreferences(e);
                }}
              >
                <input
                  type="datetime-local"
                  required
                  onChange={(e) => {setExpDate(e.target.value);}}
                />
                <button
                  className="btn btn-outline-success btn-sm ms-2"
                  type="submit"
                >
                  Open preferences
                </button>
              </form>
            )}
          </div>

          <div className="d-flex justify-content-between me-3">
            <span>
              {!isEditing ? (
                <button
                  className="btn btn-outline-info btn-sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  Edit
                </button>
              ) : (
                <>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-outline-primary btn-sm ms-2"
                    disabled
                  >
                    Submit changes
                  </button>
                </>
              )}
            </span>
            <span>
              <button
                className="btn btn-outline-danger btn-sm ms-2"
                onClick={() => setIsEditing(!isEditing)}
              >
                Delete
              </button>
            </span>
          </div>
        </>
      )}
    </>
  );
};

export default ProjectDetails;
