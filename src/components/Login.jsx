import { useState, useContext } from "react";
import authService from "../services/auth.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import eyeIcon from "../assets/icon/eye.png";
import hiddenEyeIcon from "../assets/icon/hidden-eye.png";

function Login({ showAlert }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login({ email, password });
      storeToken(response.data.authToken);
      authenticateUser();
      navigate("/cohorts");
    } catch (error) {
      showAlert(`Oooops! ${error.response.data.message}`, "danger");
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      <FloatingLabel label="Email" className="mb-3">
        <Form.Control
          type="email"
          required
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FloatingLabel>

      <FloatingLabel label="Password" className="mb-3 w-80">
        <Form.Control
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </FloatingLabel>

      <Button type="submit" variant="dark" className="me-3">
        Submit
      </Button>
      <Button
        variant="outline-light"
        onClick={() => setShowPassword(!showPassword)}
      >
        <img
          src={!showPassword ? eyeIcon : hiddenEyeIcon}
          alt="show - hide"
          width={"30px"}
        />
      </Button>
    </Form>
  );
}

export default Login;
