
import { useContext, useEffect, useState } from "react";
import cohortService from "../services/cohort.services";
import { AuthContext } from "../context/auth.context";
import CohortList from "../components/cohort-components/CohortList";
import CreateCohort from "../components/cohort-components/CreateCohort";

const CohortsPage = () => {
    const [cohorts, setCohorts] = useState(null);
    const [errorMessage, setErrorMessage] = useState(undefined);

    const { isLoading } = useContext(AuthContext)
  
    const getCohorts = () => {
      cohortService.getCohorts()
      .then((responce) => {
        setCohorts(responce.data);
      })
        .catch((error) => {
          setErrorMessage(error.response.data.message);
        });
    };

    useEffect(() => {
        getCohorts();
    }, []);

    if(isLoading){
        <p>Loading...</p>
    }

  return (
    <div className="CohortsPage row">
      <div className="col">
        <CohortList cohorts={cohorts} errorMessage={errorMessage} />
      </div>
      <div className="col">
        <CreateCohort getCohorts={getCohorts} />
      </div>
    </div>
  );
};

export default CohortsPage;
