import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { StudentContext } from "../context/student.context";

import Button from "react-bootstrap/Button";

function Navbar() {
  const [expDate, setExpDate] = useState("");
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { studentData, isValidate, logOutStudent } = useContext(StudentContext);

  const startCountdown = () => {
    const intervalId = setInterval(() => {
      getExpirationTime();
    }, 1000 * 60);
  };

  const getExpirationTime = () => {
    const timestamp = new Date(studentData.project.oneTimeId.expirationDate);
    const now = new Date();

    let milliseconds = timestamp - now;
    console.log("millis ", milliseconds);
    let seconds = Math.floor(milliseconds / 1000);
    let sec_num = Math.floor(milliseconds / 1000);
    let days = Math.floor(sec_num / 86400) % 360;
    let hours = Math.floor(sec_num / 3600) % 24;
    let minutes = Math.floor(sec_num / 60) % 60;
    setExpDate(`${days} days, ${hours} hours and ${minutes} minutes`);

    if (milliseconds > 300000) {
      setExpDate(`${days} days, ${hours} hours and ${minutes} minutes`);
    } else if (milliseconds >= 300000 && milliseconds > 0) {
      setExpDate(`You have less then ${minutes} minutes to submit`);
    } else {
      setExpDate(`Submission no possible`);
      logOutStudent();
    }
  };

  useEffect(() => {
    if (studentData) {
      getExpirationTime();
      startCountdown();
    }
  }, [isValidate]);

  return (
    <nav className="nav mb-3 justify-content-between">
      {isLoggedIn && !isValidate && (
        <>
          <NavLink to="/cohorts">
            <Button variant="dark">Manage Your Cohorts</Button>
          </NavLink>

          <NavLink to="/">
            <Button variant="dark" onClick={logOutUser}>
              Logout
            </Button>
          </NavLink>
        </>
      )}

      {!isLoggedIn && isValidate && (
        <>
          <div>
            <h5>
              Hey{" "}
              <b className="text-capitalize">
                {studentData.validateStudent.studentName}
              </b>
              ! Deadline for submission will expire in {expDate}
            </h5>
          </div>
          <NavLink to="/">
            <Button variant="dark" onClick={logOutStudent}>
              Leave Preferences
            </Button>
          </NavLink>
        </>
      )}
    </nav>
  );
}

export default Navbar;
