import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StudentContext } from "../context/student.context";
import studentService from "../services/student.services";

import StudentPreferences from "../components/student-components/StudentPreferences";
import { Button, Modal } from "react-bootstrap";


const StudentPreferencePage = () => {
  const [partecipants, setPartecipants] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [blocked, setBloked] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [preferenceSubmitted, setPreferenceSubmitted] = useState(null)
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { isValidate, studentData, logOutStudent, isLoading } = useContext(StudentContext);
  const navigate = useNavigate()

  console.log("STUDENT DATA", studentData);

  const setUpPartecipants = () => {
    if(studentData.preferenceSubmitted){
      console.log("Preferences Submitted", studentData.preferenceSubmitted)
      setPreferenceSubmitted(studentData.preferenceSubmitted)
    }
    const filterCurrentUser = studentData.project.partecipants.filter((student) => student._id !== studentData.validateStudent._id)
    console.log("filterCurrentUser", filterCurrentUser)
    setPartecipants(filterCurrentUser)
  }

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
    setBloked((prev) => [...prev, blockedStudent[0]]);
    setPartecipants((prev) => prev.filter((student) => student._id !== id));
  };

  const remove = (id, addedTo) => {
    const removedStudent = addedTo.filter((student) => {
      return student._id === id;
    });
    setBloked((prev) => prev.filter((student) => student._id !== id));
    setPreferences((prev) => prev.filter((student) => student._id !== id));
    setPartecipants((prev) => [...prev, removedStudent[0]]);
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const submitPreferences = async (edit) => {
    const projectsPreferences = {
      projectId: studentData.project._id,
      preferences: preferences.map((el) => el.studentName),
      blocked: blocked.map((el) => el.studentName),
      edit
    };
    console.log("Saving...", projectsPreferences);

    try {
      const response = await studentService.submitPreferences(studentData.validateStudent._id, projectsPreferences)
      console.log(response.data)
      if(preferenceSubmitted){
        setPreferenceSubmitted(null)
      } else {
        closeModal()
        logOutStudent()
        navigate("/thanks-page")
      }
    } catch (err) {
      console.log('ERRRRR', err)
      setErrorMessage(err.response.data.message)
    }
  };

  useEffect(() => {
    if (studentData) {
      setUpPartecipants()
    }
  }, [studentData]);

  if (!partecipants) {
    return <p>Loading</p>;
  }

  return (
    <>
    {preferenceSubmitted ? (
      <>
      <p>In order to be able to modify your choices, the previous ones need to be deleted. You'll be redirect to the page where you can submit new preferences.</p>
      <button className="btn btn-danger" onClick={() => submitPreferences(true)}> Delete</button>
      </>
    ) : (
            
        <>{/* Add animated text?? */}
          <div>
            <h3>
              Hey{" "}
              <span className="text-capitalize">
                {studentData.validateStudent.studentName}
              </span>
            </h3>
          </div>

            <Modal show={modalIsOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Sure to submit?</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ol>
                  You'd like to work with...
                  {preferences.map((student, index) => {
                    return (
                      <li
                        key={student._id}
                        className="text-capitalize ps-2 m-1"
                        style={{
                          background: 
                          `linear-gradient(to right, rgba(21,115,71,1) 0%, rgba(201,222,150,1) ${100 - index * 15}%)`,
                        }}
                      >
                        {student.studentName}
                      </li>
                    );
                  })}
                </ol>
                <hr />
                {blocked.length ? (
                  <ul>
                    You don't wanna work with...
                    {blocked.map((student) => {
                      return (
                        <li
                          key={student._id}
                          className="text-capitalize ps-2 m-1"
                          style={{
                            background:
                              "linear-gradient(to right, rgba(255,98,84,0.8) 0%,rgba(183,48,38,1) 100%)",
                          }}
                        >
                          {student.studentName}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p>No student you don't wanna work with</p>
                )}
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Back to preferences
                </Button>
                <Button variant="success" onClick={() => {submitPreferences(false)}}>
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
    )
    }

    </>
  );
};

export default StudentPreferencePage;
