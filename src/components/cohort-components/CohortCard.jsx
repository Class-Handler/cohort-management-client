import { Link } from "react-router-dom";

const CohortCard = ({ cohortObj }) => {
  return (
    <div className="CohortCard card mb-3" width="18rem" >
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
      </div>
    </div>
  );
};

export default CohortCard;
