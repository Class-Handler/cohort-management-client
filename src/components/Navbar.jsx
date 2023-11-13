import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";


function Navbar() {
  const { isLoggedIn, logOutUser } = useContext(AuthContext);

  return (
    <nav className="nav mb-5 justify-content-between">
      {isLoggedIn && (
        <>
          <div>
            <NavLink to="/">
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

      {!isLoggedIn && (
        <>
        <div>
        <NavLink to="/">
          <button id="home" className="navButton">
            Home
          </button>
        </NavLink>
      </div>
        </>
      )}
    </nav>
  );
}

export default Navbar;