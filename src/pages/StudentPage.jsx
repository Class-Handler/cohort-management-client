import { useContext, useState } from "react";
import { StudentContext } from "../context/student.context";
import StudentLogin from "../components/student-components/StudentLogin";
import StudentPreferences from "../components/student-components/StudentPreferences";

const StudentPage = () => {
  const { isValidate } = useContext(StudentContext);

  return <>{!isValidate ? <StudentLogin /> : <StudentPreferences />}</>;
};

export default StudentPage;
