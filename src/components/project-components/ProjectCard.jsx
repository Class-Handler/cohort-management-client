import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ProjectCard = ({ project, getProject }) => {
  const [text, setText] = useState({
    value: `Deadline preference submission: ${new Date(
      project.oneTimeId?.expirationDate
    ).toLocaleString("en-US")} \nProject code: ${project.oneTimeId?.uuId}`,
    copied: false,
  });

  return (
    <Card className="mb-3">
      <Card.Header
        onClick={() => getProject(project._id)}
        className={`text-uppercase bg-${
          project.oneTimeId ? "success" : "light"
        }`}
      >
        {project.projectType}
      </Card.Header>

      {project.oneTimeId && (
        <Card.Body>
          <Card.Text className="text-start">
            Deadline:{" "}
            {new Date(project.oneTimeId.expirationDate).toLocaleString("en-US")}
            <br />
            Project code: {project.oneTimeId.uuId}
            
          </Card.Text>
          <hr />
          <Card.Text>
            <CopyToClipboard
              text={text.value}
              onCopy={() => setText({ copied: true })}
            >
              <Button variant="outline-primary" size="sm">
                Copy to clipboard
              </Button>
            </CopyToClipboard>
          </Card.Text>
        </Card.Body>
      )}
    </Card>
  );
};

export default ProjectCard;
