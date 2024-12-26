import React from 'react';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Divider } from '../../components/Divider';
import { Input } from '../../components/Input';

import { FaArrowRight, FaCheck, FaTrash } from 'react-icons/fa';

import { database } from '../../services/firebase';

import { useUser } from '../../hooks/useUser';

import { ContainerRight, ContainerLeft, Wrapper, ProjectsCard, ContainerLabelButton } from './style';

type User = {
  id: string,
  name: string,
  photoURL: string,
}

type Project = {
  id: string,
  name: string,
  author: User,
  members: User[],
}


export const Home: React.FC = () => {
  const [myProjects, setMyProjects] = useState<Project[]>([]);
  const [othersProjects, setOthersProjects] = useState<Project[]>([]);

  const [projectCode, setProjectCode] = useState('');
  const [projectName, setProjectName] = useState('');

  const { user, logout } = useUser();

  const userAvatar = user?.photoURL;

  const navigate = useNavigate();

  const getProjects = () => {
    const projectsRef = database.ref(`projects`);

    projectsRef.on('value', projects => {
      const projectsDatabase: Project = projects.val() ?? {};

      const parseProjects = Object.entries(projectsDatabase).map(([key, value]) => {
        const objectValue = (value as Object) as Project;
        return {
          id: key,
          name: objectValue.name,
          author: objectValue.author,
          members: objectValue.members,
        }
      });

      setMyProjects(parseProjects.filter((project) => project.author.id === user?.id));

      let otherProjectsFilter: Project[] = [];

      parseProjects.map((project) => {
        if (project.members)
          Object.entries(project.members).map(([key, value]) => {
            const objectValue = (value as Object) as User;
            if (objectValue.id === user!?.id) {
              otherProjectsFilter.push(project);
            }
          });

        setOthersProjects(otherProjectsFilter);

      });

    });
  }

  useEffect(() => {
    getProjects();

    return (() => { setMyProjects([]) });
  }, []);

  const handleEntrar = async () => {
    if (projectCode.trim() !== '') {
      const projectsRef = database.ref("projects");


      projectsRef.on('value', async projects => {
        const projectsDatabase: Project = projects.val() ?? {};


        if (Object.keys(projectsDatabase).includes(projectCode)) {

          const projectOwner = myProjects.filter((project) => project.id === projectCode);

          if (projectOwner.length === 0) {
            projectsRef.off();
            await database.ref(`projects/${projectCode}/members`).push(user);
          }

          navigate(`project/${projectCode}`);

        }
        else {
          alert('Projeto não encontrado :(');
          setProjectCode("");
        }

      });
    }
    else {
      alert('Preecnha todos os campos!');
    }
  }

  const handleNovoProjeto = async () => {
    if (projectName.trim() !== '') {
      const projectsRef = database.ref("projects");

      const project = await projectsRef.push({
        name: projectName,
        author: user,
      });

      navigate(`project/${project.key}`);
    }
    else {
      alert('Preecnha todos os campos!');
    }
  }

  const handleSair = () => {
    logout();
    navigate('/login');
  }

  const deleteOtherProject = (id: string) => {
    const membersRef = database.ref(`projects/${id}/members`);

    membersRef.on('value', members => {
      const membersDatabase = members.val() ?? {};

      Object.entries(membersDatabase).map(async ([key, value]) => {
        const objectValue = (value as Object) as User;
        if (objectValue.id === user!?.id) {
          await database.ref(`projects/${id}/members/${key}`).remove();
        }
      });;
    });
  }

  const deleteMyProject = async (id: string) => {
    await database.ref(`projects/${id}`).remove();
  }

  return (
    <Wrapper>

      <ContainerLeft>
        {myProjects.length !== 0 && <Divider color={'var(--white)'}>Meus Projetos</Divider>}
        {myProjects.map((project) => {
          return (
            <ProjectsCard key={project.id} >
              <div onClick={() => navigate(`project/${project.id}`)}>
                <span>{project.name}</span>
                <p>{project.id}</p>
              </div>
              <FaTrash color={'white'} onClick={() => { deleteMyProject(project.id) }} />
            </ProjectsCard>
          );
        })}
        {othersProjects.length !== 0 && <Divider color={'var(--white)'}>Outros Projetos</Divider>}
        {othersProjects.map((project) => {
          return (
            <ProjectsCard key={project.id} >
              <div onClick={() => navigate(`project/${project.id}`)}>
                <span>{project.name}</span>
                <p>{project.id}</p>
              </div>
              <FaTrash color={'white'} onClick={() => { deleteOtherProject(project.id) }} />
            </ProjectsCard>
          );
        })}
      </ContainerLeft>

      <ContainerRight>
        <img src={userAvatar} alt={`${user?.name} avatar`} />
        <strong>Olá, {user?.name}!</strong>
        <div>
          <label htmlFor='project-name'>Crie um novo projeto</label>
          <ContainerLabelButton>
            <Input
              value={projectName}
              id={'project-name'}
              placeholder='nome do projeto'
              setValue={setProjectName}
            />
            <Button onclick={() => handleNovoProjeto()}>
              <FaCheck color={'white'} />
            </Button>
          </ContainerLabelButton>

          <Divider>ou</Divider>

          <label htmlFor='project-code'>Entre em um projeto existente</label>
          <ContainerLabelButton>
            <Input
              value={projectCode}
              id={'project-code'}
              placeholder='XXXXXXXXXXX'
              setValue={setProjectCode}
            />
            <Button onclick={handleEntrar} color={"#5197FF"}>
              <FaArrowRight color={'white'} />
            </Button>
          </ContainerLabelButton>
        </div>
        <button id='exit-button' onClick={handleSair}>sair</button>
      </ContainerRight>
    </Wrapper>
  );
}