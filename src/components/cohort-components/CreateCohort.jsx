import { useState } from "react";
import cohortService from "../../services/cohort.services";

const CreateCohort = ({ getCohorts }) => {
  const [cohort, setCohort] = useState({
    teacherName: "",
    cohortName: "",
    studentsNames: "",
    projectSetting: null,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCohort((values) => ({ ...values, [name]: value }));
  };

  const createCohort = (e) => {
    e.preventDefault();
    cohortService
      .createCohort(cohort)
      .then((response) => {
        console.log("New Cohort! ", response.data);
        getCohorts();
        setCohort({
          teacherName: "",
          cohortName: "",
          studentsNames: "",
          projectSetting: null,
        });
      })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  const openProjectForm = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={createCohort} className="card p-4">
      <div className="mb-3">
        <label className="form-label">Teacher Name:</label>
        <input
          type="text"
          name="teacherName"
          value={cohort.teacherName}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Cohort Name:</label>
        <input
          type="text"
          name="cohortName"
          value={cohort.cohortName}
          onChange={handleChange}
          className="form-control"
          placeholder="WD-REM-OCT-23"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          Students: <em>( enter names separated by a line-break )</em>
        </label>
        <textarea
          className="form-control"
          rows="5"
          cols="33"
          name="studentsNames"
          value={cohort.studentsNames}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-3">
        <label>
          Next Project preferences settings:
          {/* // projectSettings {} for req.body --> {projectType, preferencesNumber, blockedNumber} */}
          <button className="btn btn-light" onClick={openProjectForm}>
            Open Project form
          </button>
        </label>
      </div>

      {errorMessage && (
        <p className="error-message text-uppercase">- {errorMessage} -</p>
      )}

      <button type="submit" className="btn btn-dark">
        Submit
      </button>
    </form>
  );
};

export default CreateCohort;

// {
/* <select> Course
                    <option value="WD">Web Dev</option>
                    <option value="UX">UX Design</option>
                    <option value="DA">Data Analist</option>
                    <option value="CS">Cyber Security</option>
                </select>
                <select> Campus
                    <option value="RMT">REMOTE</option>
                    <option value="BER">Berlin</option>
                    <option value="MAD">Madrid</option>
                    <option value=""></option>
                </select>
                <select> Month:
                    <option value="GEN">Genuary</option>
                    <option value="FEB">February</option>
                    <option value="MAR">March</option>
                    <option value=""></option>
                </select>
                <select> Year:
                    <option value="23">2023</option>
                    <option value="24">2024</option>
                    <option value="25">2025</option>
                    <option value=""></option>
                </select> */
// }
