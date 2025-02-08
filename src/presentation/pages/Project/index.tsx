import React from 'react'

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaArrowLeft, FaInfo, FaPlus } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '../../components/Button';
import { CustomModal } from '../../components/Modal';

import { 
  Navbar, 
  Wrapper, 
  TaskWrapper, 
  ProjectTitle } from './style';
import { projectMock } from '../../../data/mocks/projectMock';

import { Task } from '../../../data/interfaces/task';
import { TaskStatus } from '../../../data/enums/taskStatus';
import { Row } from '../../components/Layouts/Row';
import { Tag } from '../../components/Tag';
import { TaskColumn } from '../../components/TaskColumn';
import { NewTaskModal } from '../../components/NewTaskModal';
import { InfoProjectModal } from '../../components/InfoProjectModal';
import { Project } from '../../../data/interfaces/project';
import { withCopy } from '../../hooks/withCopy';

export const ProjectPage: React.FC = () => {
  const { id } = useParams();

  const [taskModal, setTaskModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const [project, setProject] = useState<Project | null>();
  const [tasks, setTasks] = useState<Task[]>([]);

  const getProject = async () => {
    setProject(projectMock);
    setTasks(projectMock.tasks);
  }

  useEffect(() => {
    getProject();
  }, []);

  const handleDragEnd = async (result: any) => {

    if (!result.destination) return;

    if (result.source.droppableId !== result.destination.droppableId) {
      // await database.ref(`projects/${id}/tasks/${result.draggableId}`).update({
      //   status: result.destination.droppableId,
      // });
    }
    else {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      //setTasks(items);
    }
  }

  const handleDragStart = () => {
  }

  const disableScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  return (
    <Wrapper>
      <CustomModal title='Nova Tarefa' visible={taskModal} onHide={() => {
        setTaskModal(false);
        window.onscroll = function () { };
      }}>
        <NewTaskModal project={project!} onConfirm={(task) => {}} />
      </CustomModal>

      <CustomModal title='Informações do Projeto' visible={infoModal} onHide={() => {
        setInfoModal(false);
        window.onscroll = function () { };
      }}>
        <InfoProjectModal project={projectMock} />
      </CustomModal>

      <Navbar>
        <Link to={'/'}>
          <FaArrowLeft color='#212121' />
        </Link>
        <Row gap='8px'>
          <ProjectTitle>{project?.title}</ProjectTitle>
          {withCopy(<Tag size='small' label={id??""} />, id ?? "")}
        </Row>
        <Row gap='8px'>
          <Button onclick={() => {
              setTaskModal(true);
              disableScroll();
            }} >
                <FaPlus color='white' />
          </Button>
          <Button variant="secondary" onclick={() => {
              setInfoModal(true);
              disableScroll();
            }}>
              <FaInfo color='#CDCDCD' />
          </Button>
        </Row>
      </Navbar>

      <TaskWrapper>
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
          <TaskColumn
            id='pendent'
            percent={tasks.filter(task => task.taskStatus == TaskStatus.PENDING).length / tasks.length}
            taskList={tasks.filter(task => task.taskStatus == TaskStatus.PENDING)}
            title="Pendente"
          />
          <TaskColumn
            id='doing'
            percent={tasks.filter(task => task.taskStatus == TaskStatus.DOING).length / tasks.length}
            taskList={tasks.filter(task => task.taskStatus == TaskStatus.DOING)}
            title="Em Progresso"
          />
          <TaskColumn
            id='completed'
            percent={tasks.filter(task => task.taskStatus == TaskStatus.COMPLETED).length / tasks.length}
            taskList={tasks.filter(task => task.taskStatus == TaskStatus.COMPLETED)}
            title="Concluída"
          />
        </DragDropContext>
      </TaskWrapper>
    </Wrapper>
  );
}