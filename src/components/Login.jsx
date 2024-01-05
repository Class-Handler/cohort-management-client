import { useState, useContext } from "react";
import authService from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    authService.login({ email, password }) 
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/my-cohorts");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <>
          <form onSubmit={handleLoginSubmit} className="form">
            <div className="form-outline mb-2">
              <label className="form-label">
                Email
                <input
                  className="form-control mt-2"
                  type="email"
                  name="email"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>

            <div className="form-outline mb-2">
              <label className="form-label">
                Password
                <input
                  className="form-control mt-2"
                  type="password"
                  name="password"
                  value={password}
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <button type="submit" className="btn btn-warning mb-3">
              Login
            </button>
          </form>

          {errorMessage && (
            <p className="error-message text-uppercase">- {errorMessage} -</p>
          )}
        </>
  );
}

export default Login;
