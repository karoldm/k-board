import { Project } from "../../../data/interfaces/project";
import { withCopy } from "../../hooks/withCopy";
import { Avatar } from "../Avatar";
import { MembersList } from "../MembersList";
import { Tag } from "../Tag";
import { ModalInfoContent } from "./style";

type Props = {
  project: Project;
}

export const InfoProjectModal = ({project}: Props) => {

  return (
    <ModalInfoContent>
      <Avatar src={project.owner.photoUrl} alt={project.owner.name + " photo"}/>
      <strong>{project.title}</strong>
      {withCopy(<Tag size='small' label={project.id ?? ""} />, project.id ?? "")}

      <i>Participantes</i>
      <MembersList members={project.members} />
    </ModalInfoContent>
  );
}