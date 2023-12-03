import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { StudentProviderWrapper } from "./context/student.context";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Router>
    <AuthProviderWrapper>
      <StudentProviderWrapper>
        <App />
      </StudentProviderWrapper>
    </AuthProviderWrapper>
  </Router>
);
