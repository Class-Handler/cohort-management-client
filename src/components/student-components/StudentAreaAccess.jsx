import { useContext, useState } from "react";
import { StudentContext } from "../../context/student.context";
import studentService from "../../services/student.services";
import { useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const StudentAreaAccess = ({ showAlert }) => {
  const [studentName, setStudentName] = useState("");
  const [loginCode, setLoginCode] = useState("");

  const { storeStudentToken, authenticateStudent } = useContext(StudentContext);

  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      const response = await studentService.validateStudent({
        code: loginCode,
        studentName,
      });
      storeStudentToken(response.data);
      authenticateStudent();
      navigate("/student-preference");
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
      setStudentName("");
      setLoginCode("");
    }
  };

  return (
    <Form onSubmit={handleForm}>
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          type="text"
          required
          value={studentName}
          placeholder="Name"
          onChange={(e) => {
            setStudentName(e.target.value);
          }}
        />
      </FloatingLabel>
      <FloatingLabel label="Project Code" className="mb-3">
        <Form.Control
          type="text"
          required
          value={loginCode}
          placeholder="Project Code"
          onChange={(e) => {
            setLoginCode(e.target.value);
          }}
        />
      </FloatingLabel>
      <Button type="submit" variant="warning">
        Submit
      </Button>
    </Form>
  );
};

export default StudentAreaAccess;
