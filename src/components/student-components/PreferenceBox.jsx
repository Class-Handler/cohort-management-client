import { useDrop } from "react-dnd";
import PartecipantBox from "./PartecipantBox";
import { StudentContext } from "../../context/student.context";
import { useContext } from "react";

const PreferenceBox = ({ updateList, preferences, type, remove, boxType }) => {
  const { studentData } = useContext(StudentContext);

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: type,
    drop: (item) => updateList(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }), [type, preferences]);

  return (
    <div
      className={boxType === "preferences" ? "col col-5 border border-success shadow p-3 mb-5 bg-body rounded" : "col col-5 border border-danger shadow p-3 mb-5 bg-body rounded" }
      ref={drop}
      style={{height: '20rem', background: canDrop && "mintcream"}} 
    >
      <ol ref={drop} className={boxType === "blocked" ? "list-unstyled" : undefined}>
        {preferences.map((student) => {
          return (
            <li key={student._id}>
              <PartecipantBox student={student} type="chosen" addedTo={preferences} remove={remove}/>
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default PreferenceBox;
