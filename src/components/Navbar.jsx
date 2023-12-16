import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { StudentContext } from "../context/student.context";


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);
  const { studentData, isValidate, logOutStudent } = useContext(StudentContext);
console.log('navbar  ', studentData)
  return (
    <nav className="nav mb-5 justify-content-between">
      {(isLoggedIn && !isValidate) && (
        <>
          <div>
            <NavLink to="/my-cohorts">
              <button className="btn btn-dark">Manage Your Cohorts</button>
            </NavLink>
          </div>

          <div>
            <NavLink to="/">
              <button className="btn btn-dark align-end" onClick={logOutUser}>
                Logout
              </button>
            </NavLink>
          </div>
        </>
      )}

      {(!isLoggedIn && !isValidate)&& (
        <>
        <div>
        <NavLink to="/student-area">
          <button className="btn btn-warning">
            Student area
          </button>
        </NavLink>
      </div>
        </>
      )}

      {(isValidate) && (
        <>
        <div>

          <button className="btn btn-warning">
            <span className="text-uppercase">{studentData.validateStudent.studentName}</span>'s preferences
          </button>

      </div>
      <div>
            <NavLink to="/student-area">
              <button className="btn btn-dark align-end" onClick={logOutStudent}>
                Leave Preferences
              </button>
            </NavLink>
          </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;