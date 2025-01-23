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

export const Home = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const { userData, logout } = useUser();

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setMyProjects([projectMock, projectMock, projectMock]);
  }, []);

  return (
    <Wrapper>
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
            <Button width={'40px'} onclick={()=>{}}>
              <Row>
                <FaPlus color='white' />
              </Row>
            </Button>
            <Divider type="vertical" />
            <PopupMenu items={[
              {onClick: () => {}, label: userData?.email ?? ""},
              {onClick: () =>{}, label: "Sair"}
            ]}>
              <Avatar src={userData?.photoUrl ?? ""} />
            </PopupMenu>
          </Row>
        </Nav>

        <Grid columns='2fr 1fr' rows='auto'>
          <Container> 
            <Grid style={{height: 'auto'}} columns={"1fr 1fr 1fr"} rows={"auto"}>
              {myProjects.map(project => 
                <ProjectCard key={project.id} project={project} />  
              )}
            </Grid>
          </Container>

          <Container>
              
          </Container>
        </Grid>
    </Wrapper>
  );
}