import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CohortPage from './pages/CohortPage';


function App() {

  return (
    <div className="App container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:cohortId" element={<CohortPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  )
}

export default App
