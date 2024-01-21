import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CohortsPage from './pages/CohortsPage';
import CohortPage from './pages/CohortPage';
import LabPairingPage from "./pages/LabPairingPage"
import StudentPreferencePage from './pages/StudentPreferencePage';
import StudentAreaPage from './pages/StudentAreaPage';
import ThanksPage from './pages/ThanksPage';


function App() {

  return (
    <div className="App m-3">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/students-area' element={<StudentAreaPage />} />
          <Route path='/preference-page' element={<StudentPreferencePage />} />
          <Route path='/thanks-page'  element={<ThanksPage /> } /> 
          <Route path="/my-cohorts" element={<CohortsPage />} />
          <Route path="/:cohortId" element={<CohortPage />} />
          <Route path="/lab-pairs/:cohortId" element={<LabPairingPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  )
}

export default App
