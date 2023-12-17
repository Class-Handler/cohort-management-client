import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CohortsPage from './pages/CohortsPage';
import CohortPage from './pages/CohortPage';
import StudentPage from './pages/StudentPage';
import StudentLogin from './pages/StudentLogin';


function App() {

  return (
    <div className="App container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/students-area' element={<StudentLogin />} />
          <Route path='/student-page' element={<StudentPage />} />
          <Route path="/my-cohorts" element={<CohortsPage />} />
          <Route path="/:cohortId" element={<CohortPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  )
}

export default App
