import { useState } from 'react'
import { GetResponseAPI } from '../../../../../data/interfaces/apiResponse'
import { Project } from '../../../../../data/interfaces/project'
import { useProjectRespository } from '../../../../../data/repositories/projectRepository'
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
  data?: GetResponseAPI<Project[]>
  isLoading: boolean
  isFetching: boolean
  page: number
  onPageChange: (page: number) => void
}

export const ProjectList = ({
  data,
  isFetching,
  isLoading,
  onPageChange,
  page,
}: Props) => {
  const [deleteProjectModal, setDeleteProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [projectModal, setProjectModal] = useState(false)

  const { editProjectMutation, deleteProjectMutation } = useProjectRespository()

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

      await deleteProjectMutation.mutateAsync(selectedProject.id!)
      showToast('Projeto deletado com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    } finally {
      setDeleteProjectModal(false)
      setSelectedProject(null)
    }
  }

  const saveProject = async (title: string) => {
    try {
      if (!selectedProject) return
      await editProjectMutation.mutateAsync({
        id: selectedProject.id!,
        title: title,
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
          initialValue={selectedProject?.title ?? ''}
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
                <h3 className='text'>Meus Projetos</h3>
                <p className='text'>{data?.totalElements ?? 0}</p>
              </Row>
              <Grid
                style={{ height: 'auto' }}
                columns={'1fr 1fr'}
                rows={'auto'}
              >
                {data?.content.map((project: Project) => (
                  <ProjectCard
                    isOwner
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
