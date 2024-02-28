import { useContext } from "react";
import { StudentContext } from "../../context/student.context";
import PartecipantBox from "./PartecipantBox";
import PreferenceBox from "./PreferenceBox";
import { Button, Card, Col, Row } from "react-bootstrap";

const StudentPreferences = ({
  partecipants,
  preferences,
  blocked,
  updatePreferences,
  updateBlocked,
  remove,
  openModal,
}) => {
  const { studentData } = useContext(StudentContext);

  return (
    <>
    {/* MAYBE INSTRUCTIONS AREA MODAL */}
      <Row className="mb-3 h-20">
        <Col md={6}>
          <Card className="mb-3 shadow-sm h-100">
            <Card.Header as="h5" className="text-capitalize text-center">
              Partecipants
            </Card.Header>
            <Card.Body>
              {partecipants.map((student) => {
                return (
                  <PartecipantBox
                    student={student}
                    key={student._id}
                    type="notPickedYet"
                  />
                );
              })}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-3 shadow-sm h-100">
            <Card.Header as="h5" className="text-capitalize text-center">
              {studentData.project.projectType}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <span
                  className={`${
                    preferences.length !==
                      studentData.project.preferencesNumber && "invisible"
                  }`}
                >
                  ✅{" "}
                </span>{" "}
                Number of choosen student you'd like to work with:{"  "}
                <b>{preferences.length}</b>/
                <b>{studentData.project.preferencesNumber}</b>
              </Card.Text>
              <Card.Text>
                <span
                  className={`${
                    blocked.length !== studentData.project.blockedNumber &&
                    "invisible"
                  }`}
                >
                  🚫{" "}
                </span>{" "}
                Max number of student you can choose to NOT work with:{"  "}
                <b>{blocked.length}</b>/
                <b>{studentData.project.blockedNumber}</b>
              </Card.Text>
              <Button
                variant="outline-success"
                onClick={openModal}
                disabled={
                  preferences.length !== studentData.project.preferencesNumber
                    ? true
                    : false
                }
              >
                Submit
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-2">
        <Col md={6}>
          <PreferenceBox
            updateList={updatePreferences}
            preferences={preferences}
            type={
              preferences.length < studentData.project.preferencesNumber
                ? "notPickedYet"
                : "no-more"
            }
            boxType="preferences"
            remove={remove}
          />
        </Col>

        <Col md={6}>
          <PreferenceBox
            updateList={updateBlocked}
            preferences={blocked}
            type={
              blocked.length < studentData.project.blockedNumber
                ? "notPickedYet"
                : "no-more"
            }
            boxType="blocked"
            remove={remove}
          />
        </Col>
      </Row>
    </>
  );
};

export default StudentPreferences;
