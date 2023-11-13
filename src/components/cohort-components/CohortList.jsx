import { useEffect, useState } from "react";
import cohortService from "../../services/cohort.services";
import { Link } from "react-router-dom";

const CohortList = () => {
  const [cohorts, setCohorts] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const getUserCohorts = () => {
    cohortService.getCohorts()
    .then((responce) => {
      setCohorts(responce.data);
    })
      .catch((error) => {
        setErrorMessage(error.response.data.message);
      });
  };

  useEffect(() => {
    getUserCohorts();
  }, []);

  return (
    <div className="CohortList">
      {!cohorts.length && <p>CREATE chort</p>}
      <div>
        {cohorts.map((cohortObj) => {
          return (
            <div className="card mb-3" width= "18rem" key={cohortObj._id}>
              <div className="card-body">
                <Link to={`/${cohortObj._id}`} className="card-title text-capitalize">
                  <h3>{cohortObj.cohortName}</h3>
                </Link>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Teacher: {cohortObj.teacherName}
                </h6>
                <p className="card-text">
                  Number of students: {cohortObj?.students.length}
                </p>
                <p className="card-text">
                  Projects created: {cohortObj?.projects.length}
                </p>
                <button className="btn btn-danger">Delete Cohort</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CohortList;
