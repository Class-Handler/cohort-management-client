import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../../context/student.context";
import studentService from "../../services/student.services";
import { useDrop } from "react-dnd";
import PartecipantBox from "./PartecipantBox";
import PreferenceBox from "./PreferenceBox";

const StudentPreferences = ({
  partecipants,
  preferences,
  blocked,
  updatePreferences,
  updateBlocked,
  remove
}) => {

  const { studentData } = useContext(StudentContext);


  // const [{ isOver, canDrop }, drop] = useDrop(() => ({
  //   accept: "button",
  //   drop: (item) => updatePreferences(item.id),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //     canDrop: !!monitor.canDrop(),
  //   }),
  // }));

  return (
    <>
      <div className="row">
        <div className="col col-6">
          {partecipants.sort().map((student) => {
            return <PartecipantBox student={student} key={student._id} type="notPickedYet"/>;
          })}
        </div>
        {/* <PreferenceBox
            updateList={updatePartecipants}
            preferences={partecipants}
            type="chosen"
          /> */}

          <PreferenceBox
            updateList={updatePreferences}
            preferences={preferences}
            type={ preferences.length < studentData.project.preferencesNumber ? "notPickedYet" : "no-more"}
            addedTo="preferences"
            remove={remove}
          />
          <PreferenceBox
            updateList={updateBlocked}
            preferences={blocked}
            type={ (blocked.length < studentData.project.blockedNumber) ? "notPickedYet" : "no-more"}
            addedTo="blocked"
            remove={remove}
          />
      </div>
    </>
  );
};

export default StudentPreferences;

// preferences.length = studentData.project.preferencesNumber && 