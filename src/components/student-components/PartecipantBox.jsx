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
      <div ref={drag} className={remove ? "d-flex justify-content-between btn btn-light btn-sm m-1 text-capitalize" : "btn btn-dark btn-sm m-1 text-capitalize"}  style={{ opacity: isDragging ? 0.5 : 1 }}>
      <span>{student.studentName}</span>
      {remove && <span onClick={() => remove(student._id, addedTo)}>❌</span>}
      </div>

    );
  }
};

export default PartecipantBox;
