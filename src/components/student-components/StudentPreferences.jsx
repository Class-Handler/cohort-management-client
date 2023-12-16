import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../../context/student.context";
import studentService from "../../services/student.services";

const StudentPreferences = () => {
  const [partecipants, setPartecipants] = useState([])
  const [preferences, setPreferences] = useState([]);
  const [blocked, setBloked] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);
  
  // onClick add to preferences
  // display preferences
  // clean up partecipants --> create state

  const { studentData, logOutStudent, isLoading } = useContext(StudentContext);

  const addToPreferences = (studentObj) => {    
    const remainingPartecipants = partecipants.filter(el => el._id !== studentObj._id )
    setPartecipants(remainingPartecipants)
    setPreferences([...preferences, studentObj])
  }

  const removeFromPreferences = (studentObj) => {
    const remainingPreferences = preferences.filter(el => el._id !== studentObj._id )
    setPreferences(remainingPreferences)
    setPartecipants([...partecipants, studentObj])
  }

  const addToBlocked = (studentObj) => {
    const remainingPartecipants = partecipants.filter(el => el._id !== studentObj._id )
    setPartecipants(remainingPartecipants)
    setBloked([...blocked, studentObj])
  }

  const removeFromBloked = (studentObj) => {
    const remainingBloked = blocked.filter(el => el._id !== studentObj._id )
    setBloked(remainingBloked)
    setPartecipants([...partecipants, studentObj])
  }

  useEffect(() => {
    setPartecipants(studentData.partecipants)
  }, [studentData])

  return (
    <>
      <h2>{studentData.project.projectType}</h2>
      {preferences.length < studentData.project.preferencesNumber && <p>Choose {studentData.project.preferencesNumber} people</p>}
      {preferences.length === studentData.project.preferencesNumber && <p>You can block max {studentData.project.blockedNumber} people</p>}
      <div className="row">
        <div className="col col-6">
          {partecipants.map((el) => {
            return (
              <button className="btn btn-light m-3 text-capitalize" key={el._id} onClick={() => (preferences.length <= studentData.project.preferencesNumber) ? addToPreferences(el) : addToBlocked(el)}>
                {el.studentName}
              </button>
            );
          })}
        </div>
        <ol className="col col-3">
          {preferences.map((el) => {
            return (
              <li key={el._id}>
                <button className="btn btn-success m-1 text-capitalize" onClick={() => removeFromPreferences(el)}>{el.studentName}</button>
              </li>
            )
          })}
        </ol>
        <ul className="col col-3">
        {blocked.map((el) => {
            return (
              <li key={el._id}>
                <button className="btn btn-danger m-1 text-capitalize" onClick={() => removeFromBloked(el)}>{el.studentName}</button>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
};

export default StudentPreferences;
