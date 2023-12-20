import { useDrag } from "react-dnd";

const PartecipantBox = ({student, type, addedTo, remove}) => {

  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: {id: student._id},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }), [student._id]);

  {
    return (
      <span ref={drag} className="btn btn-light m-1 text-capitalize" style={{ opacity: isDragging ? 0.5 : 1 }}>
        {student.studentName} {remove && <span onClick={() => remove(student._id, addedTo)}>X</span>}
      </span>
    );
  }
};

export default PartecipantBox;
