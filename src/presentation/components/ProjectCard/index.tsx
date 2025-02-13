import { FaEdit, FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { Project } from '../../../data/interfaces/project'
import { Button } from '../Button'
import { Row } from '../Layouts/Row'
import { MembersList } from '../MembersList'
import { ProgressBar } from '../ProgressBar'
import { Tag } from '../Tag'
import { Container } from './style'

type Props = {
  project: Project
  onEdit: () => void
  onDelete: () => void
  isOwner?: boolean
}

export const ProjectCard = ({
  project,
  onEdit,
  onDelete,
  isOwner = false,
}: Props) => {
  const navigate = useNavigate()

  return (
    <Container>
      <Row fullWidth justifyContent='space-between'>
        <Tag
          label={project.title}
          onClick={() => navigate(`/project/${project.id}`)}
        />
        {isOwner && (
          <Row>
            <Button onClick={onEdit} noBorder variant='secondary'>
              <FaEdit color='#666' />
            </Button>
            <Button onClick={onDelete} noBorder variant='secondary'>
              <FaTrash color='#666' />
            </Button>
          </Row>
        )}
      </Row>
      <MembersList members={project.members.concat([project.owner])} />
      <ProgressBar percent={project.progress * 100} />
    </Container>
  )
}
