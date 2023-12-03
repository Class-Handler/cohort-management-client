import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/student.context";
import studentService from "../../services/student.services";

const StudentLogin = () => {
  const [studentName, setStudentName] = useState(null);
  const [loginCode, setLoginCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeValidationCode, authenticateStudent } =
    useContext(StudentContext);

  const handleForm = async (e) => {
    e.preventDefault();

    studentService
      .validateStudent(loginCode, studentName)
      .then((response) => {
        console.log(response.data);
        // storeValidationCode(response.data.project.oneTimeId.uuId);
        // authenticateStudent(response.data);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(err.response.data.message);
      });
  };

  return (
    <div className="StudentLogin">

      {errorMessage && (
        <p className="error-message text-uppercase">- {errorMessage} -</p>
      )}

      <form onSubmit={handleForm}>
        <label>
          Name:
          <input
            type="text"
            required
            onChange={(e) => {
              setStudentName(e.target.value);
            }}
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            required
            onChange={(e) => {
              setLoginCode(e.target.value);
            }}
          />
        </label>
        <button className="btn btn-warning" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StudentLogin;