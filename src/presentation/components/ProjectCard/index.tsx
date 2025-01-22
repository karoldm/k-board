import { FaEdit, FaTrash } from "react-icons/fa";
import { Project } from "../../../data/interfaces/project";
import { Avatar } from "../Avatar/style";
import { Row } from "../Layouts/Row";
import { ProgressBar } from "../ProgressBar";
import { Tag } from "../Tag";
import { Container } from "./style";

type Props = {
  project: Project;
  handleClick: () => void;
}

export const ProjectCard = ({project, handleClick}: Props) => {
  return (
    <Container onClick={handleClick}>
      <Row fullWidth justifyContent="space-between">
        <Tag label={project.title} />
        <Row gap="8px">
          <FaEdit color="#666" />
          <FaTrash color="#666" />
        </Row>
      </Row>
      <Row>
        {project.members.concat([project.owner]).
          map((member, index) => 
            <Avatar 
              style={ index != 0 ? {marginLeft: '-8px'} : {}} 
              src={member.photoUrl} key={member.id} 
            />
        )}
      </Row>
      <ProgressBar percent={project.progress * 100} />
    </Container>
  );
}