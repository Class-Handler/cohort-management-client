import { useContext, useEffect, useState } from "react";
import cohortService from "../services/cohort.services";
import { AuthContext } from "../context/auth.context";
import CohortList from "../components/cohort-components/CohortList";
import CreateCohort from "../components/cohort-components/CreateCohort";
import { Col, Row } from "react-bootstrap";

const CohortsPage = ({showAlert}) => {
  const [cohorts, setCohorts] = useState(null);

  const { isLoading } = useContext(AuthContext);

  const getCohorts = async () => {
    try {
      const response = await cohortService.getCohorts()
      setCohorts(response.data);
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger")
    }
  };

  useEffect(() => {
    getCohorts();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
      <Row>
        <Col md={6}>
          <div
            className="overflow-y-scroll shadow p-3 bg-body rounded"
            style={{ height: "80vh" }}
          >
            <CreateCohort showAlert={showAlert} getCohorts={getCohorts}/>
          </div>
        </Col>
        <Col md={{ span: 6, order: "first" }}>
          {!cohorts?.length ? (
            <h4>Create your first cohort</h4>
          ) : (
            <div
              className="overflow-y-scroll shadow p-3 bg-body rounded"
              style={{ height: "80vh" }}
            >
              <CohortList cohorts={cohorts} />
            </div>
          )}
        </Col>
      </Row>
  );
};

export default CohortsPage;
