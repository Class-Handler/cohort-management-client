import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { StudentContext } from "../context/student.context";
import StudentPreferences from "../components/student-components/StudentPreferences";

const StudentPage = () => {
  const [partecipants, setPartecipants] = useState(null);
  const [preferences, setPreferences] = useState([]);
  const [blocked, setBloked] = useState([]);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const { isValidate, studentData, logOutStudent, isLoading } = useContext(StudentContext);

  const updatePreferences = (id) => {
    const chosenStudent = partecipants.filter((student) => {
     return (student._id === id)
    })
    console.log('want to work with',chosenStudent)
    setPreferences((prev) => [...prev, chosenStudent[0] ])
    setPartecipants((prev) => prev.filter((student) => student._id !== id));
  }

  const updateBlocked = (id) => {
    console.log(id)
    const blockedStudent = partecipants.filter((student) => {
     return (student._id === id)
    })
    console.log('block',blockedStudent)
    setBloked((prev) => [...prev, blockedStudent[0] ])
    setPartecipants((prev) => prev.filter((student) => student._id !== id));
  }

  const remove = (id, addedTo) => {
    console.log("in partecipants again", id, addedTo);
    const removedStudent = addedTo.filter((student) => {
      return student._id === id;
    });
    console.log(removedStudent);
    setBloked((prev) => prev.filter((student) => student._id !== id));
    setPreferences((prev) => prev.filter((student) => student._id !== id));
    setPartecipants((prev) => [...prev, removedStudent[0]]);
  };
  
  useEffect(() => {
    if (studentData) {
      setPartecipants(studentData.partecipants);
    }
  }, [studentData]);

  return (
    <>
      {(partecipants)&&(
        <div>
          <h3>
            Hey{" "}
            <span className="text-capitalize">
              {studentData.validateStudent.studentName}
            </span>
            ! Submit your preferences for the {studentData.project.projectType}
          </h3>
          {preferences.length < studentData.project.preferencesNumber && (
            <p>Choose {studentData.project.preferencesNumber} people</p>
          )}
          {preferences.length === studentData.project.preferencesNumber && (
            <p>You can block max {studentData.project.blockedNumber} people</p>
          )}
          <DndProvider backend={HTML5Backend}>
            <StudentPreferences partecipants={partecipants} preferences={preferences} blocked={blocked} updatePreferences={updatePreferences} updateBlocked={updateBlocked} remove={remove}/>
          </DndProvider>
        </div>
      )}
    </>
  );
};

export default StudentPage;
