import { useState } from 'react'
import { FaPlus, FaSearch, FaUserPlus } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import {
  useCreateProject,
  useEnterProject,
} from '../../../../../data/repositories/projectRepository'
import { useUser } from '../../../../../hooks/useUser'
import { Avatar } from '../../../../components/Avatar'
import { Button } from '../../../../components/Button'
import { Divider } from '../../../../components/Divider'
import { Input } from '../../../../components/Input'
import { Row } from '../../../../components/Layouts/Row'
import { CustomModal } from '../../../../components/Modal'
import { EnterProjectModal } from '../../../../components/Modal/EnterProjectModal'
import { NewProjectModal } from '../../../../components/Modal/NewProjectModal'
import { PopupMenu } from '../../../../components/PopMenu'
import { handleError } from '../../../../utils/handleError'
import { showToast } from '../../../../utils/showToast'
import { Nav } from './style'

type Props = {
  text: string
  onChange: (value: string) => void
}

export const NavBar = ({ onChange, text }: Props) => {
  const { userData, clearUserData } = useUser()
  const navigate = useNavigate()

  const [projectModal, setProjectModal] = useState(false)
  const [enterProjectModal, setEnterProjectModal] = useState(false)

  const { mutateAsync: createProjectMutation, isPending: createProjectPending } = useCreateProject()
  const { mutateAsync: enterProjectMutation, isPaused: enterProjectPending } = useEnterProject()

  const saveProject = async (title: string) => {
    try {
      await createProjectMutation(title)
      showToast('Projeto criado com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    } finally {
      setProjectModal(false)
    }
  }

  const enterProject = async (id: string) => {
    try {
      await enterProjectMutation(id)
      showToast('Participação adicionada com sucesso!', 'success')
    } catch (error) {
      handleError(error)
    } finally {
      setEnterProjectModal(false)
    }
  }
  return (
    <>
      <CustomModal
        title={'Novo Projeto'}
        visible={projectModal}
        onHide={() => {
          setProjectModal(false)
          window.onscroll = function () {}
        }}
      >
        <NewProjectModal loading={createProjectPending} handleConfirm={saveProject} />
      </CustomModal>

      <CustomModal
        title={'Participar de um Projeto'}
        visible={enterProjectModal}
        onHide={() => {
          setEnterProjectModal(false)
          window.onscroll = function () {}
        }}
      >
        <EnterProjectModal loading={enterProjectPending} handleConfirm={enterProject} />
      </CustomModal>
      <Nav>
        <Row fullWidth gap='8px'>
          <FaSearch color='gray' />
          <Input
            value={text}
            onChange={(e) => {
              onChange(e.target.value)
            }}
            id='searchText'
            placeholder='Procure por um projeto'
          />
        </Row>
        <Row gap='8px' style={{ height: '40px' }} justifyContent='end'>
          <Button
            width={'40px'}
            onClick={() => {
              setProjectModal(true)
            }}
          >
            <Row>
              <FaPlus color='white' />
            </Row>
          </Button>

          <Button
            variant='secondary'
            width={'40px'}
            onClick={() => {
              setEnterProjectModal(true)
            }}
          >
            <Row>
              <FaUserPlus color='gray' />
            </Row>
          </Button>
          <Divider type='vertical' />
          <PopupMenu
            items={[
              { onClick: () => {
                navigate('/profile')
              }, label: userData?.name ?? '' },
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
              image={userData?.photoUrl ?? ''}
            />
          </PopupMenu>
        </Row>
      </Nav>
    </>
  )
}
