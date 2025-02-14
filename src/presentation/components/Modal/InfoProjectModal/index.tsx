import { Project } from '../../../../data/interfaces/project'
import { Avatar } from '../../Avatar'
import { MembersList } from '../../MembersList'
import { Tag } from '../../Tag'
import { WithCopy } from '../../WithCopy'
import { ModalInfoContent } from './style'

type Props = {
  project: Project
}

export const InfoProjectModal = ({ project }: Props) => {
  return (
    <ModalInfoContent gap='8px'>
      <Avatar
        src={project.owner.photoUrl}
        alt={project.owner.name + ' photo'}
      />
      <strong>{project.title}</strong>
      <WithCopy text={project.id ?? ''}>
        <Tag size='small' label={project.id ?? ''} />
      </WithCopy>
      <i>Participantes</i>
      <MembersList members={project.members} />
    </ModalInfoContent>
  )
}
