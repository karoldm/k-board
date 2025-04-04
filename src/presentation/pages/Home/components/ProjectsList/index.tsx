import { useState } from 'react'
import { GetPaginationResponseAPI } from '../../../../../data/interfaces/apiResponse'
import { Project } from '../../../../../data/interfaces/project'
import {
  useDeleteProject,
  useEditProject,
} from '../../../../../data/repositories/projectRepository'
import { Column } from '../../../../components/Layouts/Column'
import { Grid } from '../../../../components/Layouts/Grid'
import { Row } from '../../../../components/Layouts/Row'
import { Loading } from '../../../../components/Loading'
import { CustomModal } from '../../../../components/Modal'
import { ConfirmModal } from '../../../../components/Modal/ConfirmModal'
import { NewProjectModal } from '../../../../components/Modal/NewProjectModal'
import { Pagination } from '../../../../components/Pagination'
import { ProjectCard } from '../../../../components/ProjectCard'
import { handleError } from '../../../../utils/handleError'
import { showToast } from '../../../../utils/showToast'
import { Container } from './style'

type Props = {
  data?: GetPaginationResponseAPI<Project[]>
  isLoading: boolean
  isFetching: boolean
  page: number
  onPageChange: (page: number) => void
  isOwner: boolean
}

export const ProjectList = ({
  data,
  isFetching,
  isLoading,
  onPageChange,
  page,
  isOwner,
}: Props) => {
  const [deleteProjectModal, setDeleteProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectModal, setProjectModal] = useState(false)

  const { mutateAsync: deleteProjectMuation, isPending: deleteProjectPending } = useDeleteProject()
  const { mutateAsync: editProjectMutation, isPending: editProjectPending } = useEditProject()

  const onEditProject = (project: Project) => {
    setSelectedProject(project)
    setProjectModal(true)
  }

  const onDeleteProject = (project: Project) => {
    setSelectedProject(project)
    setDeleteProjectModal(true)
  }

  const deleteProject = async () => {
    try {
      if (!selectedProject) return

      await deleteProjectMuation(selectedProject.id!)
      showToast('Projeto deletado com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    } finally {
      setDeleteProjectModal(false)
      setSelectedProject(null)
    }
  }

  const saveProject = async (title: string, membersToRemove: string[]) => {
    try {
      if (!selectedProject) return

      await editProjectMutation({
        id: selectedProject.id!,
        title: title,
        membersToRemove: membersToRemove,
      })

      showToast('Projeto editado com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    } finally {
      setProjectModal(false)
      setSelectedProject(null)
    }
  }

  return (
    <>
      <CustomModal
        title='Excluir Projeto'
        visible={deleteProjectModal}
        onHide={() => {
          setDeleteProjectModal(false)
          window.onscroll = function () {}
        }}
      >
        <ConfirmModal
          loading={deleteProjectPending}
          onConfirm={deleteProject}
          onCancel={() => {
            setDeleteProjectModal(false)
          }}
          text='Ao excluir o projeto ele será removido permanentemente, bem como todas as tarefas atreladas a ele. Deseja continuar?'
        />
      </CustomModal>

      <CustomModal
        title={selectedProject ? 'Editar Projeto' : 'Novo Projeto'}
        visible={projectModal}
        onHide={() => {
          setProjectModal(false)
          window.onscroll = function () {}
        }}
      >
        <NewProjectModal
          loading={editProjectPending}
          initialValue={{
            title: selectedProject?.title ?? '',
            members: selectedProject?.members ?? [],
          }}
          handleConfirm={saveProject}
        />
      </CustomModal>

      <Container>
        {isLoading || isFetching ? (
          <Loading variant='primary' />
        ) : (
          <Column
            fullHeight
            fullWidth
            justifyContent='space-between'
            alignItems='end'
            gap='24px'
          >
            <Column
              fullWidth
              justifyContent='start'
              alignItems='end'
              gap='24px'
            >
              <Row justifyContent='space-between' fullWidth>
                <h3 className='text'>
                  {isOwner ? 'Meus Projetos' : 'Outros projetos'}
                </h3>
                <p className='text'>{data?.totalElements ?? 0}</p>
              </Row>
              <Grid
                style={{ height: 'auto' }}
                columns={'1fr 1fr'}
                rows={'auto'}
              >
                {data?.content.map((project: Project) => (
                  <ProjectCard
                    isOwner={isOwner}
                    onEdit={() => onEditProject(project)}
                    onDelete={() => onDeleteProject(project)}
                    key={project.id}
                    project={project}
                  />
                ))}
              </Grid>
            </Column>
            <Pagination
              current={page}
              hasNext={!(data?.last ?? true)}
              onChangePage={onPageChange}
              total={data?.totalPages ?? 0}
            />
          </Column>
        )}
      </Container>
    </>
  )
}
