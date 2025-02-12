import { AxiosError } from 'axios'
import { useEffect, useState } from 'react'
import { FaPlus, FaSearch } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { Project } from '../../../data/interfaces/project'
import { useProjectRespository } from '../../../data/repositories/projectRepository'
import { useUser } from '../../../hooks/useUser'
import { Avatar } from '../../components/Avatar'
import { Button } from '../../components/Button'
import { Divider } from '../../components/Divider'
import { Input } from '../../components/Input'
import { Column } from '../../components/Layouts/Column'
import { Grid } from '../../components/Layouts/Grid'
import { Row } from '../../components/Layouts/Row'
import { Loading } from '../../components/Loading'
import { CustomModal } from '../../components/Modal'
import { ConfirmModal } from '../../components/Modal/ConfirmModal'
import { NewProjectModal } from '../../components/Modal/NewProjectModal'
import { PopupMenu } from '../../components/PopMenu'
import { ProjectCard } from '../../components/ProjectCard'
import { showToast } from '../../utils/showToast'
import { Container, Nav, Wrapper } from './style'

export const Home = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([])
  const [projectsMember, setProjectsMembers] = useState<Project[]>([])
  const { userData, clearUserData } = useUser()
  const navigate = useNavigate()

  const [searchText, setSearchText] = useState('')

  const [newProjectModal, setNewProjectModal] = useState(false)
  const [deleteProjectModal, setDeleteProjectModal] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const { getProjectsOwnerMutation } = useProjectRespository()

  const handleError = (error: any) => {
    console.log(error)
    const errorData = (error as AxiosError)?.response?.data as {
      message: string
      status: string
    }

    showToast(
      'Erro ao carregar projetos: ' +
        (errorData?.message || 'Erro desconhecido'),
      'error'
    )
  }

  const fetchProjects = async () => {
    try {
      const projects = await getProjectsOwnerMutation.mutateAsync()
      setMyProjects(projects)
    } catch (error) {
      handleError(error)
    }
  }

  useEffect(() => {
    fetchProjects()
    console.log(userData)
  }, [])

  const onEditProject = (project: Project) => {
    setSelectedProject(project)
    setNewProjectModal(true)
  }

  const onDeleteProject = (project: Project) => {
    setSelectedProject(project)
    setDeleteProjectModal(true)
  }

  const saveProject = (title: string) => {}

  const deleteProject = () => {}

  return (
    <Wrapper>
      <CustomModal
        title={selectedProject ? 'Editar Projeto' : 'Novo Projeto'}
        visible={newProjectModal}
        onHide={() => {
          setNewProjectModal(false)
          window.onscroll = function () {}
        }}
      >
        <NewProjectModal
          initialValue={selectedProject?.title ?? ''}
          handleConfirm={saveProject}
        />
      </CustomModal>

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

      <Nav>
        <Row fullWidth gap='8px'>
          <Input
            value={searchText}
            setValue={setSearchText}
            id='searchText'
            placeholder='Procure por um projeto'
          />
          <Button width={'40px'} onClick={() => {}}>
            <FaSearch color='white' />
          </Button>
        </Row>
        <Row style={{ height: '40px' }} justifyContent='end'>
          <Button
            width={'40px'}
            onClick={() => {
              setNewProjectModal(true)
            }}
          >
            <Row>
              <FaPlus color='white' />
            </Row>
          </Button>
          <Divider type='vertical' />
          <PopupMenu
            items={[
              { onClick: () => {}, label: userData?.email ?? '' },
              {
                onClick: () => {
                  clearUserData()
                  navigate('/login')
                },
                label: 'Sair',
              },
            ]}
          >
            <Avatar
              src={userData?.photoUrl ?? ''}
              alt={userData?.name + ' photo'}
            />
          </PopupMenu>
        </Row>
      </Nav>

      <Grid columns='1fr 1fr' rows='auto'>
        {getProjectsOwnerMutation.isPending ? (
          <Loading color='#5677d9' />
        ) : (
          <Container>
            <Column justifyContent='start' alignItems='start' gap='24px'>
              <Row justifyContent='space-between' fullWidth>
                <h3 className='text'>Meus Projetos</h3>
                <p className='text'>{myProjects.length}</p>
              </Row>
              <Grid
                style={{ height: 'auto' }}
                columns={'1fr 1fr'}
                rows={'auto'}
              >
                {myProjects.map((project) => (
                  <ProjectCard
                    onEdit={() => onEditProject(project)}
                    onDelete={() => onDeleteProject(project)}
                    key={project.id}
                    project={project}
                  />
                ))}
              </Grid>
            </Column>
          </Container>
        )}

        <Container>
          <Column justifyContent='start' alignItems='start' gap='24px'>
            <Row justifyContent='space-between' fullWidth>
              <h3 className='text'>Outros Projetos</h3>
              <p className='text'>{projectsMember.length}</p>
            </Row>
            <Grid style={{ height: 'auto' }} columns={'1fr 1fr'} rows={'auto'}>
              {projectsMember.map((project) => (
                <ProjectCard
                  onEdit={() => onEditProject(project)}
                  onDelete={() => onDeleteProject(project)}
                  key={project.id}
                  project={project}
                />
              ))}
            </Grid>
          </Column>
        </Container>
      </Grid>
    </Wrapper>
  )
}
