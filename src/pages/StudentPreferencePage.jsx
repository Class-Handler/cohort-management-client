import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StudentContext } from "../context/student.context";
import studentService from "../services/student.services";

import StudentPreferences from "../components/student-components/StudentPreferences";
import { Button, ListGroup, Modal } from "react-bootstrap";

const StudentPreferencePage = ({ showAlert }) => {
  const [partecipants, setPartecipants] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [blocked, setBlocked] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { studentData, logOutStudent } = useContext(StudentContext);

  const navigate = useNavigate();

  const setUpPartecipants = () => {
    const checkAlreadySubmit =
      studentData.validateStudent.projectsPreferences.find(({ projectId }) => {
        return projectId === studentData.project._id;
      });

    const excludeCurrentUserFromPartecipants =
      studentData.project.partecipants.filter(
        (student) => student._id !== studentData.validateStudent._id
      );

    if (!checkAlreadySubmit) {
      setPartecipants(excludeCurrentUserFromPartecipants);
      return;
    }

    const partecipantsListRemaining = excludeCurrentUserFromPartecipants.filter(
      (student) =>
        !checkAlreadySubmit.blocked.map((el) => el._id).includes(student._id) &&
        !checkAlreadySubmit.preferences
          .map((el) => el._id)
          .includes(student._id)
    );

    setBlocked(checkAlreadySubmit.blocked);
    setPreferences(checkAlreadySubmit.preferences);
    setPartecipants(partecipantsListRemaining);
  };

  const updatePreferences = (id) => {
    const chosenStudent = partecipants.filter((student) => {
      return student._id === id;
    });
    setPreferences((prev) => [...prev, chosenStudent[0]]);
    setPartecipants((prev) => prev.filter((student) => student._id !== id));
  };

  const updateBlocked = (id) => {
    const blockedStudent = partecipants.filter((student) => {
      return student._id === id;
    });
    setBlocked((prev) => [...prev, blockedStudent[0]]);
    setPartecipants((prev) => prev.filter((student) => student._id !== id));
  };

  const remove = (id, addedTo) => {
    const removedStudent = addedTo.filter((student) => {
      return student._id === id;
    });
    setBlocked((prev) => prev.filter((student) => student._id !== id));
    setPreferences((prev) => prev.filter((student) => student._id !== id));
    setPartecipants((prev) => [...prev, removedStudent[0]]);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const submitPreferences = async () => {
    const projectsPreferences = {
      projectId: studentData.project._id,
      preferences,
      blocked,
    };

    try {
      await studentService.submitPreferences(
        studentData.validateStudent._id,
        projectsPreferences
      );
      showAlert("Thank you for submitting your preferences!!!!")
      closeModal();
      logOutStudent();
      navigate("/students-area");
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  useEffect(() => {
    if (studentData) {
      setUpPartecipants();
    }
  }, [studentData]);

  if (!partecipants) {
    return <p>Loading</p>;
  }

  return (
    <>
      <Modal show={modalIsOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Sure to submit?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup as="ol" numbered>
            You'd like to work with...
            {preferences.map((student, index) => {
              return (
                <ListGroup.Item as="li"
                                  key={student._id}
                  className="text-capitalize"
                  style={{
                    background: `linear-gradient(to right, rgba(21,115,71,1) 0%, rgba(201,222,150,1) ${
                      100 - index * 15
                    }%)`,
                  }}>
                  {student.studentName}
                </ListGroup.Item>
              );
            })}
          </ListGroup>
          <hr />
          {blocked.length ? (
            <ListGroup>
              You don't wanna work with...
              {blocked.map((student) => {
                return (
                  <ListGroup.Item
                    key={student._id}
                    className="text-capitalize"
                    style={{
                      background:
                        "linear-gradient(to right, rgba(255,98,84,0.8) 0%,rgba(183,48,38,1) 100%)",
                    }}
                  >
                    {student.studentName}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          ) : (
            <p>No student you don't wanna work with</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Back to preferences
          </Button>
          <Button
            variant="success"
            onClick={() => {
              submitPreferences(false);
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

      <DndProvider backend={HTML5Backend}>
        <StudentPreferences
          partecipants={partecipants}
          preferences={preferences}
          blocked={blocked}
          updatePreferences={updatePreferences}
          updateBlocked={updateBlocked}
          remove={remove}
          openModal={openModal}
        />
      </DndProvider>
    </>
  );
};

export default StudentPreferencePage;
