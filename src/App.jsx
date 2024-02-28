import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CohortsPage from "./pages/CohortsPage";
import CohortPage from "./pages/CohortPage";
import StudentPreferencePage from "./pages/StudentPreferencePage";
import ProjectPreferencesPage from "./pages/ProjectPreferencesPage";
import { Alert, ToastContainer } from "react-bootstrap";

function App() {
  const [toastAlert, setToastAlert] = useState({
    show: false,
    message: "",
    variant: "",
  });

  const showAlert = (message, variant) => {
    setToastAlert({
      show: true,
      message: message,
      variant: variant,
    });
    dismissAlert();
  };

  const dismissAlert = () => {
    setTimeout(() => {
      setToastAlert({ show: false, message: "", variant: "" });
    }, 3000);
  };

  return (
    <div className="App m-3">
      {toastAlert.show && (
        <ToastContainer
          className="p-2"
          position="top-center"
          style={{ zIndex: 1 }}
        >
          <Alert variant={toastAlert.variant} className="text-capitalize">
            {toastAlert.message}
          </Alert>
        </ToastContainer>
      )}
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage  showAlert={showAlert} />} />
        <Route path="/student-preference" element={<StudentPreferencePage showAlert={showAlert} />} />
        <Route
          path="/cohorts"
          element={<CohortsPage showAlert={showAlert} />}
        />
        <Route
          path="/:cohortId"
          element={<CohortPage showAlert={showAlert} />}
        />
        <Route
          path="/preferences/:cohortId/:projectId"
          element={<ProjectPreferencesPage showAlert={showAlert} />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
