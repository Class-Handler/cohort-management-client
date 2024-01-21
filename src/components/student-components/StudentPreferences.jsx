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
  remove,
  openModal,
}) => {
  const { studentData } = useContext(StudentContext);

  return (
    <>
      <div
        className="row d-flex justify-content-evenly mb-5"
        style={{ height: "10rem" }}
      >
        <div className="col col-5">
          {partecipants.map((student) => {
            return (
              <PartecipantBox
                student={student}
                key={student._id}
                type="notPickedYet"
              />
            );
          })}
        </div>

        {/* INSTRUCTIONS AREA --> create component */}
        <div className="col col-5">
          <p>
            Project: <b>{studentData.project.projectType}</b>
          </p>

          <p>
            Number of choosen student you'd like to work with:{"  "}
            <b>{preferences.length}</b>/
            <b>{studentData.project.preferencesNumber}</b>{"  "}
            {preferences.length === studentData.project.preferencesNumber && (
              <b>✅ </b>
            )}
          </p>

          <p>
            Max number of student you can choose to NOT work with:{"  "}
            <b>{blocked.length}</b>/
            <b>{studentData.project.blockedNumber}</b>{"  "}
            {blocked.length === studentData.project.blockedNumber && (
              <b>✅ </b>
            )}
          </p>

          {preferences.length === studentData.project.preferencesNumber && (
            <button
              className="btn btn-success"
              onClick={openModal}
            >
              Submit
            </button>
          )}
        </div>
      </div>

      <div className="row d-flex justify-content-evenly">
        <PreferenceBox
          updateList={updatePreferences}
          preferences={preferences}
          type={
            preferences.length < studentData.project.preferencesNumber
              ? "notPickedYet"
              : "no-more"
          }
          boxType="preferences"
          remove={remove}
        />
        <PreferenceBox
          updateList={updateBlocked}
          preferences={blocked}
          type={
            blocked.length < studentData.project.blockedNumber
              ? "notPickedYet"
              : "no-more"
          }
          boxType="blocked"
          remove={remove}
        />
      </div>
    </>
  );
};

export default StudentPreferences;

// preferences.length = studentData.project.preferencesNumber &&
