import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const CohortCard = ({ cohortObj }) => {
  return (
    <Card className="mb-3 shadow-sm">
      <Link to={`/${cohortObj._id}`} style={{ textDecoration: "none", color: "black" }}>
        <Card.Header as="h5" className="text-capitalize text-center">
          {cohortObj.cohortName}
        </Card.Header>
      </Link>
      <Card.Body>
        <Card.Text>Teacher: {cohortObj.teacherName}</Card.Text>
        <Card.Text>Number of students: {cohortObj.students.length}</Card.Text>
        <Card.Text>Projects created: {cohortObj.projects.length}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CohortCard;
