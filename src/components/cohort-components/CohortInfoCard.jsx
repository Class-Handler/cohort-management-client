import { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";

const CohortInfoCard = ({ cohort, deleteCohort, handleNewProjectButton }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <>
      <Modal show={modalIsOpen} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Sure to delete <span className="text-capitalize">{cohort.cohortName}</span>?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            This action will delete the cohort and all the info related:
            projects and students.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteCohort}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Card className="shadow p-3 mb-5 bg-body rounded">
        <Card.Header className="text-uppercase text-xl">
          {cohort.cohortName}
        </Card.Header>
        <Card.Body>
          <Card.Text>Techer: {cohort.teacherName}</Card.Text>
          <Card.Text>Owner: {cohort.userId.email}</Card.Text>

          {cohort.accessTo && (
            <Card.Text>
              Who have access:{" "}
              {cohort.accessTo.map((user) => {
                return (
                  <span key={user._id} className="me-3">
                    {user.email}
                  </span>
                );
              })}
            </Card.Text>
          )}
          <div className="d-flex justify-content-between">
            <span>
              <Button variant="outline-primary" size="sm" className="me-3">
                Edit
              </Button>
              <Button
                variant="outline-dark"
                size="sm"
                className="me-3"
                onClick={handleNewProjectButton}
              >
                New Project
              </Button>
            </span>
            <span>
              <Button
                variant="outline-danger"
                size="sm"
                className="me-3"
                onClick={openModal}
              >
                Delete
              </Button>
            </span>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default CohortInfoCard;
