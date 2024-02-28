import { Col, Row } from "react-bootstrap";
import CohortCard from "./CohortCard";

const CohortList = ({ cohorts }) => {
  return (
    <Row>
      {cohorts.map((cohortObj) => {
        return (
          <Col md={6} key={cohortObj._id} >
            <CohortCard cohortObj={cohortObj} />
          </Col>
        )
      })}
    </Row>
  )
}

export default CohortList;
