const StudentDetails = ({ student }) => {
  console.log(student);
  return (
    <div>
      <h4 className="text-capitalize">{student.studentName}</h4>

      {student.pairedWith.length ? (
        <p>Alredy paird with: {" "}
        {student.pairedWith.map((pair) => {
          return <span key={pair._id} className="text-capitalize"> {pair.studentName}, </span>
        })}
        </p>
      ) : (
        <p>No lab in pair yet</p>
      )}

      {student.projectsPreferences.length ? (
        <p>Project preferences submitted:</p>
      ) : (
        <p>Haven't participated to any project yet</p>
      )}
    </div>
  );
};

export default StudentDetails;
