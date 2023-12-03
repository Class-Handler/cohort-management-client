import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import cohortService from "../services/cohort.services";
import CreateProject from "../components/project-components/CreateProject";
import CohortDetails from "../components/cohort-components/CohortDetails";

const CohortPage = () => {
  const [cohort, setCohort] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { cohortId } = useParams();

  const getCohort = async () => {
    try {
      const response = await cohortService.getCohort(cohortId);
      console.log(response.data)
      setCohort(response.data);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    getCohort();
  }, [cohortId]);

  return (
    <div className="CohortPage">
      {cohort && (
        <div className="row">
          <div className="col col-8">
          { errorMessage && <p className="error-message text-uppercase">- {errorMessage} -</p> }
            <CohortDetails cohort={cohort} />
          </div>
          <div className="col col-4">
            <CreateProject cohortId={cohort._id} getCohort={getCohort} partecipants={cohort.students}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default CohortPage;
