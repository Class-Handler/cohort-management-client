import React, { useState, useEffect } from "react";
import studentService from "../services/student.services";
const StudentContext = React.createContext();

function StudentProviderWrapper(props) {
  const [isValidate, setIsValidate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);

  const storeStudentToken = (token) => {
    localStorage.setItem("studentToken", token);
  };

  const authenticateStudent = async () => {
    const storedStudentToken = localStorage.getItem("studentToken");

    if (storedStudentToken) {
      try {
        const verifyed = await studentService.verifyStudent();
        setStudentData(verifyed.data);
        setIsValidate(true);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsValidate(false);
        setIsLoading(false);
        setStudentData(null);
      }
    } else {
      setIsValidate(false);
      setIsLoading(false);
      setStudentData(null);
    }
  };

  const removeStudentToken = () => {
    localStorage.removeItem("studentToken");
  };

  const logOutStudent = () => {
    removeStudentToken();
    authenticateStudent();
  };

  useEffect(() => {
    authenticateStudent();
  }, []);

  return (
    <StudentContext.Provider
      value={{
        isValidate,
        isLoading,
        studentData,
        storeStudentToken,
        authenticateStudent,
        logOutStudent,
      }}
    >
      {props.children}
    </StudentContext.Provider>
  );
}

export { StudentProviderWrapper, StudentContext };
