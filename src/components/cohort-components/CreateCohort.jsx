import { useState } from "react";
import cohortService from "../../services/cohort.services";
import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
const defaultValue = {
  teacherName: "",
  cohortName: "",
  studentsNames: "",
  projectSetting: null,
  emailsAccessTo: [],
};

const CreateCohort = ({ showAlert, getCohorts }) => {
  const [cohort, setCohort] = useState(defaultValue);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCohort((values) => ({ ...values, [name]: value }));
  };

  const addAccessEmail = (e) => {
    e.preventDefault();
    if (email) {
      const emails = [...cohort.emailsAccessTo, email];
      setCohort((prev) => ({ ...prev, emailsAccessTo: emails }));
      setEmail("");
    }
  };

  const removeAccessEmail = (e, email) => {
    e.preventDefault();
    const emails = cohort.emailsAccessTo.filter((el) => {
      return el !== email;
    });
    setCohort((prev) => ({ ...prev, emailsAccessTo: emails }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      showAlert(
        `You might give access to ${email} before create a new cohort`,
        "warning"
      );
      return;
    }
    createCohort();
  };

  const createCohort = () => {
    cohortService
      .createCohort(cohort)
      .then((response) => {
        showAlert(
          `${response.data.cohortName} successfully created`,
          "success"
        );
        setCohort(defaultValue);
        getCohorts();
      })
      .catch((error) => {
        console.log(error);
        showAlert(`Oooops! ${error.response.data}`, "danger");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <FloatingLabel label="Teacher Name">
          <Form.Control
            type="text"
            placeholder="Teacher Name"
            name="teacherName"
            value={cohort.teacherName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </InputGroup>

      <InputGroup className="mb-3">
        <FloatingLabel label="Cohort Name (ex: WD-REM-OCT-23)">
          <Form.Control
            type="text"
            placeholder="ex: WD-REM-OCT-23"
            name="cohortName"
            value={cohort.cohortName}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </InputGroup>

      <InputGroup className="mb-3">
        <FloatingLabel label="Students: ( enter names separated by a line-break )">
          <Form.Control
            as="textarea"
            placeholder="Students: ( enter names separated by a line-break )"
            style={{ height: "200px" }}
            name="studentsNames"
            value={cohort.studentsNames}
            onChange={handleChange}
            required
          />
        </FloatingLabel>
      </InputGroup>

      <Form.Label>Give access to:</Form.Label>
      <InputGroup className="mb-3">
        <Form.Control
          aria-describedby="basic-addon3"
          type="email"
          value={email}
          placeholder="myColleague@work.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={(e) => addAccessEmail(e)}>
          ➕
        </Button>
      </InputGroup>

      {cohort.emailsAccessTo.map((email, i) => {
        return (
          <p key={i} className="d-flex justify-content-between border rounded">
            <span className="m-2">{email}</span>
            <Button
              variant="outline-danger"
              size="md"
              onClick={(e) => removeAccessEmail(e, email)}
            >
              ➖
            </Button>
          </p>
        );
      })}

      <Button type="submit" variant="dark">
        Submit
      </Button>
    </Form>
  );
};

export default CreateCohort;

// {
/* <select> Course
                    <option value="WD">Web Dev</option>
                    <option value="UX">UX Design</option>
                    <option value="DA">Data Analist</option>
                    <option value="CS">Cyber Security</option>
                </select>
                <select> Campus
                    <option value="RMT">REMOTE</option>
                    <option value="BER">Berlin</option>
                    <option value="MAD">Madrid</option>
                    <option value=""></option>
                </select>
                <select> Month:
                    <option value="GEN">Genuary</option>
                    <option value="FEB">February</option>
                    <option value="MAR">March</option>
                    <option value=""></option>
                </select>
                <select> Year:
                    <option value="23">2023</option>
                    <option value="24">2024</option>
                    <option value="25">2025</option>
                    <option value=""></option>
                </select> */
// }
