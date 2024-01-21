import { useContext, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AuthContext } from "../context/auth.context";
import { StudentContext } from "../context/student.context";
import { Link } from "react-router-dom";
import lostGif from "../assets/images/lost-gif.gif"

const HomePage = () => {
  const [toggle, setToggle] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  const { isValidate, studentData } = useContext(StudentContext);

  return (
    <div className="row d-flex justify-content-center ">
      {!isLoggedIn && !isValidate && (
        <>
          <div className="col">
            {!toggle && (
              <div>
                <Login />
                <div className="mt-4">
                  <span>Don't have an account yet? </span>
                  <button
                    className="btn btn-dark"
                    onClick={() => setToggle(!toggle)}
                  >
                    Go to sign up
                  </button>
                </div>
              </div>
            )}
            {toggle && (
              <div>
                <Signup />
                <div className="mt-4">
                  <span className="mt-4">Do you already have an account? </span>
                  <button
                    className="btn btn-dark"
                    onClick={() => setToggle(!toggle)}
                  >
                    Go to log in
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="col">
            <p>This application will allow you to manage your cohorts</p>
          </div>
        </>
      )}

      {isValidate && (
        <>
        <h3 className="text-align-center mb-5">Oooops, sounds you landed on the wrong page!</h3>
        <div><img src={lostGif} alt="Are you lost?" width={"400px"}/>
          <Link to={"/student-page"}>
            <button className="btn btn-warning">Go back to submit your project's preferences</button>
          </Link>
          </div>
        </>
      )}

      {isLoggedIn && (
        <div className="col">
          <p>You're logged in!</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
