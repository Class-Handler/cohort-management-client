import { useState } from "react";
import { Link } from "react-router-dom";

const CohortDetails = ({ cohort, getProject, setProject, deleteCohort, getStudent, setStudent }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <p>Techer: {cohort.teacherName}</p>
      <p>Access to: {cohort.userId.email}</p>
      {!toggle ? (
        <section className="mb-2">
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => setToggle(!toggle)}
          >
            Close projects list
          </button>
          <button
            className="btn btn-outline-info btn-sm me-2"
            onClick={() => setToggle(!toggle)}
          >
            See all {cohort.students.length} students
          </button>
          <Link to={`/lab-pairs/${cohort._id}`} style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-success btn-sm me-2">
              Manage Pairs
            </button>
          </Link>
          <button className="btn btn-outline-dark btn-sm me-2" onClick={() => {setProject(null); setStudent(null)}}>New Project</button>
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={deleteCohort}
          >
            Delete Cohort
          </button>
          <div className="card p-3">
            {!cohort.projects.length ? (
              <p>No Projects Yet</p>
            ) : (
              cohort.projects.map((project) => {
                return (
                  <button
                    key={project._id}
                    className={
                      project.oneTimeId
                        ? "btn btn-primary m-2"
                        : "btn btn-light m-2"
                    }
                    onClick={() => {
                      getProject(project._id);
                    }}
                  >
                    {project.projectType}
                    {project.oneTimeId && (
                      <small> (open for preferences)</small>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </section>
      ) : (
        <section className="mb-2">
          <button
            className="btn btn-outline-info btn-sm me-2"
            onClick={() => setToggle(!toggle)}
          >
            See all {cohort.projects.length} projects
          </button>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => setToggle(!toggle)}
          >
            Close students list
          </button>
          <Link to={`/lab-pairs/${cohort._id}`} style={{ textDecoration: "none" }}>
            <button className="btn btn-outline-success btn-sm me-2">
              Manage Pairs
            </button>
          </Link>
          <button className="btn btn-outline-dark btn-sm me-2" onClick={() => {setProject(null); setStudent(null)}}>New Project</button>
          <button
            className="btn btn-outline-danger btn-sm me-2"
            onClick={deleteCohort}
          >
            Delete Cohort
          </button>
          <div className="card p-3">
            {cohort.students.map((student) => {
              return (
                <div key={student._id} onClick={() => {getStudent(student._id)}} className="d-flex justify-content-between btn btn-light btn-sm mb-1 text-capitalize">
                    <span  >{student.studentName}</span>
                      <span
                        className="text-danger"
                         >
                        ❌
                      </span>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </>
  );
};

export default CohortDetails;
