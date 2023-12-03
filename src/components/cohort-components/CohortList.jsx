import CohortCard from "./CohortCard";

const CohortList = ({ cohorts, errorMessage }) => {
  return (
    <div className="CohortList">
        { errorMessage && <p className="error-message text-uppercase">- {errorMessage} -</p> }

      {!cohorts?.length && <p>CREATE cohort</p>}

      {cohorts && (
        <div>
          {cohorts.map((cohortObj) => {
            return <CohortCard cohortObj={cohortObj} key={cohortObj._id} />;
          })}
        </div>
      )}
    </div>
  );
};

export default CohortList;
