import { useDrop } from "react-dnd";
import PartecipantBox from "./PartecipantBox";
import { ListGroup } from "react-bootstrap";

const PreferenceBox = ({ updateList, preferences, type, remove, boxType }) => {
  const [{ canDrop }, drop] = useDrop(
    () => ({
      accept: type,
      drop: (item) => updateList(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [type, preferences]
  );

  return (
    <div
      className={`border shadow p-3 rounded overflow-y-scroll ${
        boxType === "preferences"
          ? "border-success bg-success-subtle"
          : "border-danger bg-danger-subtle"
      }`}
      ref={drop}
      style={{ height: "50vh" }}
    >
      <ListGroup as="ol" numbered ref={drop}>
        {preferences.map((student) => {
          return (
            <ListGroup.Item
              key={student._id}
              as="li"
              className="d-flex align-items-center p-1 mb-1 rounded"
            >
              <PartecipantBox
                student={student}
                type="chosen"
                addedTo={preferences}
                remove={remove}
              />
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
};

export default PreferenceBox;
