import React from 'react';

import { useEffect, useState } from 'react';

import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { Input } from '../../components/Input';

import { useUser } from '../../../hooks/useUser';

import { Container, Nav, Wrapper } from './style';
import { projectMock } from '../../../data/mocks/projectMock';
import { Project } from '../../../data/interfaces/project';
import { PopupMenu } from '../../components/PopMenu';
import { Row } from '../../components/Layouts/Row';
import { FaPlus, FaSearch } from 'react-icons/fa';
import { ProjectCard } from '../../components/ProjectCard';
import { Grid } from '../../components/Layouts/Grid';
import { Avatar } from '../../components/Avatar';
import { Column } from '../../components/Layouts/Column';
import { CustomModal } from '../../components/Modal';
import { NewProjectModal } from '../../components/Modal/NewProjectModal';

export const Home = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [projectsMember, setProjectsMembers] = useState<Project[]>([]);
  const { userData, logout } = useUser();

  const [searchText, setSearchText] = useState("");

  const [newProjectModal, setNewProjectModal] = useState(false);

  useEffect(() => {
    setMyProjects([projectMock, projectMock, projectMock]);
    setProjectsMembers([projectMock, projectMock]);
  }, []);

  return (
    <Wrapper>
        <CustomModal 
          title='Novo Projeto' 
          visible={newProjectModal} 
          onHide={() => {
            setNewProjectModal(false);
            window.onscroll = function () { };
          }}
        >
          <NewProjectModal handleConfirm={(title) => {}} />
        </CustomModal>

        <Nav>
          <Row fullWidth gap="8px">
            <Input 
              value={searchText} 
              setValue={setSearchText} 
              id="searchText" 
              placeholder="Procure por um projeto" 
            />
            <Button width={'40px'} onclick={()=>{}}>
              <FaSearch color='white' />
            </Button>
          </Row>
          <Row style={{height:'40px'}} justifyContent="end">
            <Button width={'40px'} onclick={()=>{
              setNewProjectModal(true);
            }}>
              <Row>
                <FaPlus color='white' />
              </Row>
            </Button>
            <Divider type="vertical" />
            <PopupMenu items={[
              {onClick: () => {}, label: userData?.email ?? ""},
              {onClick: () =>{}, label: "Sair"}
            ]}>
              <Avatar src={userData?.photoUrl ?? ""} alt={userData?.name + " photo"} />
            </PopupMenu>
          </Row>
        </Nav>

        <Grid columns='1fr 1fr' rows='auto'>
          <Container>
            <Column justifyContent='start' alignItems='start' gap='24px'>
              <Row justifyContent='space-between' fullWidth>
                <h3 className='text'>Meus Projetos</h3>
                <p className='text'>{myProjects.length}</p>
              </Row>
              <Grid style={{height: 'auto'}} columns={"1fr 1fr"} rows={"auto"}>
                {myProjects.map(project => 
                  <ProjectCard key={project.id} project={project} />  
                )}
              </Grid>
            </Column>
          </Container>

          <Container>
            <Column justifyContent='start' alignItems='start' gap='24px'>
              <Row justifyContent='space-between' fullWidth>
                <h3 className='text'>Outros Projetos</h3>
                <p className='text'>{projectsMember.length}</p>
              </Row>
              <Grid style={{height: 'auto'}} columns={"1fr 1fr"} rows={"auto"}>
                  {projectsMember.map(project => 
                    <ProjectCard key={project.id} project={project} />  
                  )}
              </Grid>
            </Column>
          </Container>
        </Grid>
    </Wrapper>
  );
}