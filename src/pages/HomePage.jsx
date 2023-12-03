import { useContext, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AuthContext } from "../context/auth.context";
import StudentLogin from "../components/student-components/StudentLogin";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [toggle, setToggle] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  
  return (
    <div>
      {!isLoggedIn && (
        <div className="row">
        <div className="col">
          {!toggle && (
            <div>
              <button onClick={() => setToggle(!toggle)}>Go to sign up</button>
              <Login />
            </div>
          )}
          {toggle && (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => setToggle(!toggle)}
              >
                Go to log in
              </button>
              <Signup />
            </div>
          )}
          </div>
          <div className="col">
          <Link to={'/student-area'}><button className="btn btn-warning">Student Preferences</button></Link>
          </div>
        </div>
      )}
      {isLoggedIn && (
        <p>you're log in</p>
      )}
    </div>
  );
};

export default HomePage;
