import { useContext, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AuthContext } from "../context/auth.context";
import { StudentContext } from "../context/student.context";
import { Link } from "react-router-dom";
import lostGif from "../assets/images/lost-gif.gif";

import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StudentAreaAccess from "../components/student-components/StudentAreaAccess";
import { Button, Card } from "react-bootstrap";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [key, setKey] = useState("student-area");

  const { isLoggedIn } = useContext(AuthContext);
  const { isValidate, studentData } = useContext(StudentContext);

  const handleCloseAlert = () => {
    setShow(false);
    setErrorMessage(undefined);
  };

  const handleError = (errMessage) => {
    setShow(true);
    setErrorMessage(errMessage);
  };

  return (
    <Container>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="student-area" title="Student Login">
          <Row>
            <Col xs={12} md={6}>
              <StudentAreaAccess handleError={handleError} />
            </Col>
            <Col xs={12} md={6}>
              {isValidate ? (
                <Card className="text-center mb-5">
                  <Card.Header as="h4">
                    Oooops, maybe you wanna go back...
                  </Card.Header>
                  <Card.Body>
                    <img src={lostGif} alt="Are you lost?" width={"300px"} />
                    <Link to={"/student-preference"}>
                      <Button variant="warning">
                        ...to submit your project's preferences
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              ) : (
                <p>Submit your project's preferences.... Instructions</p>

              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="login" title="Log In">
          <Row>
            <Col xs={12} md={6}>
              <Login handleError={handleError} />
            </Col>
            <Col xs={12} md={6}>
              <p>App to manage your cohort</p>

              {isLoggedIn && <p>You're logged in!</p>}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="signup" title="Sign Up">
          <Row>
            <Col xs={12} md={6}>
              <Signup handleError={handleError} />
            </Col>
            <Col xs={12} md={6}>
              <p>App to manage your cohort</p>
            </Col>{" "}
            {isLoggedIn && <p>You're logged in!</p>}
          </Row>
        </Tab>
      </Tabs>

      {show && (
        <Alert variant="danger" onClose={handleCloseAlert} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>{errorMessage}</p>
        </Alert>
      )}
    </Container>
  );
};

export default HomePage;
