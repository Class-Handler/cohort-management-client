import { useContext, useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AuthContext } from "../context/auth.context";
import CohortList from "../components/cohort-components/CohortList";
import CreateCohort from "../components/cohort-components/CreateCohort";

const HomePage = () => {
  const [toggle, setToggle] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);
  return (
    <div>
      {!isLoggedIn && (
        <>
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
        </>
      )}
      {isLoggedIn && (
        <div className="row">
          <div className="col">
            <CohortList />
          </div>
          <div className="col">
            <CreateCohort />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
