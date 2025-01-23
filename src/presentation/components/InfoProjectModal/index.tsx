import { Project } from "../../../data/interfaces/project";
import { ModalInfoContent } from "./style";

type Props = {
  project: Project;
}

export const InfoProjectModal = ({project}: Props) => {

  return (
    <ModalInfoContent>
      <img style={{width: "40px"}} src={project.owner.photoUrl} alt='author project photo' />
      <strong>{project.title}</strong>
      <p>{project.id}</p>
      <i>Participantes</i>
      <div>
        {project.members.map((member) => {
          return (
            <img key={member.id} src={member.photoUrl} alt='member project photo' title={member.name} />
          );
        })}
      </div>
    </ModalInfoContent>
  );
}