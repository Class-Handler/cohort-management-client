import { Link, useParams } from "react-router-dom";

const StudentDetails = ({ student }) => {
  
  const { cohortId } = useParams()

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
        <p>Project preferences submitted: 
        {student.projectsPreferences.map((preference) => {
          return <Link to={`/preferences/${cohortId}/${preference.projectId._id}`} key={preference._id}><span className="btn btn-outline-primary btn-sm ms-2"> {preference.projectId.projectType} </span></Link>
        })}
        </p>
      ) : (
        <p>Haven't submitted any project preference yet</p>
      )}
    </div>
  );
};

export default StudentDetails;
