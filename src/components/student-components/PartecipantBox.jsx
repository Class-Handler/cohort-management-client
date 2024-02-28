import { Button } from "react-bootstrap";
import { useDrag } from "react-dnd";

const PartecipantBox = ({ student, type, addedTo, remove }) => {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: type,
      item: { id: student._id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [student._id]
  );

  {
    return (
      <Button
        ref={drag}
        variant={`${remove ? "light" : "outline-secondary"}`}
        size="sm"
        className={`text-capitalize ${remove ? "w-100 " : "m-1"}`}
        style={{ opacity: isDragging ? 0.5 : 1 }}
      >
        <div className="d-flex justify-content-between">
          <span>{student.studentName}</span>
          {remove && <span onClick={() => remove(student._id, addedTo)}>❌</span>}
        </div>
      </Button>
    );
  }
};

export default PartecipantBox;
