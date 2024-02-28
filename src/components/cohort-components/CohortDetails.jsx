import { useState } from "react";
import LabPairing from "../lab-pairing-components/LabPairing";
import CreateProject from "../project-components/CreateProject";
import ProjectDetails from "../project-components/ProjectDetails";
import StudentDetails from "../student-components/StudentDetails";
import CohortInfoCard from "./CohortInfoCard";
import ProjectCard from "../project-components/ProjectCard";
import { Col, ListGroup, Row, Tab, Tabs } from "react-bootstrap";

const CohortDetails = ({
  student,
  cohort,
  project,
  getProject,
  getStudent,
  deleteCohort,
  createProject,
  handleNewProjectButton,
}) => {
  const [key, setKey] = useState("cohort-info");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="cohort-info" title="Cohort Info">
        <Row>
          <Col>
            <CohortInfoCard
              cohort={cohort}
              deleteCohort={deleteCohort}
              handleNewProjectButton={handleNewProjectButton}
            />
          </Col>
          <Col>
            {!project ? (
              <CreateProject
                cohortId={cohort._id}
                createProject={createProject}
                allStudents={cohort.students}
              />
            ) : (
              <ProjectDetails
                project={project}
                cohortId={cohort._id}
                getProject={getProject}
                handleNewProjectButton={handleNewProjectButton}

              />
            )}
          </Col>
        </Row>
      </Tab>

      <Tab eventKey="projects" title={`Projects (${cohort.projects.length})`}>
        <Row>
          <Col className="text-center">
            {!cohort.projects.length ? (
              <p>No Projects Yet</p>
            ) : (
              <div
                className="overflow-y-scroll shadow p-3 bg-body rounded"
                style={{ height: "70vh" }}
              >
                {cohort.projects.map((project) => {
                  return (
                    <ProjectCard
                      key={project._id}
                      project={project}
                      getProject={getProject}
                    />
                  );
                })}
              </div>
            )}
          </Col>
          <Col>
            <div
              className="overflow-y-scroll shadow p-3 bg-body rounded"
              style={{ height: "70vh" }}
            >
              {project ? (
                <ProjectDetails
                  project={project}
                  cohortId={cohort._id}
                  getProject={getProject}
                  handleNewProjectButton={handleNewProjectButton}
                />
              ) : (
                <CreateProject
                  cohortId={cohort._id}
                  createProject={createProject}
                  allStudents={cohort.students}
                />
              )}
            </div>
          </Col>
        </Row>
      </Tab>

      <Tab eventKey="students" title={`Students (${cohort.students.length})`}>
        <Row>
          <Col>
            <ListGroup
              as="ol"
              numbered
              className="overflow-y-scroll shadow p-3 bg-body rounded"
              style={{ height: "70vh" }}
            >
              {cohort.students.map((student) => {
                return (
                  <ListGroup.Item
                    as="button"
                    key={student._id}
                    variant="light"
                    size="sm"
                    className="text-capitalize text-start mb-1"
                    onClick={() => {
                      getStudent(student._id);
                    }}
                  >
                    {student.studentName}
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          </Col>
          <Col>{student && <StudentDetails student={student} />}</Col>
        </Row>
      </Tab>

      <Tab eventKey="pairs" title="Lab Pairs">
        <LabPairing />
      </Tab>
    </Tabs>
  );
};

export default CohortDetails;
