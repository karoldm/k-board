import React from 'react'

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import { FaArrowLeft, FaInfo, FaPlus } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

import { database } from '../../../data/services/firebase';

import { 
  Navbar, 
  ModalTaskContent, 
  Wrapper, 
  TaskWrapper, 
  ModalInfoContent, 
  ProjectTitle } from './style';
import { projectMock } from '../../../data/mocks/projectMock';

import { Task } from '../../../data/interfaces/task';
import { TaskStatus } from '../../../data/enums/taskStatus';
import { Row } from '../../components/Layouts/Row';
import { Tag } from '../../components/Tag';
import { TaskCard } from '../../components/TaskCard';
import { TaskColumn } from '../../components/TaskColumn';

type Member = {
  id: string,
  name: string,
  photoURL: string,
}

export const Project: React.FC = () => {
  const { id } = useParams();

  const [taskModal, setTaskModal] = useState(false);
  const [infoModal, setInfoModal] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectAuthorPhoto, setProjectAuthorPhoto] = useState('');
  const [projectMembers, setProjectMembers] = useState<Member[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('#000000');


  const getProject = async () => {
    setProjectName(projectMock.title);
    setProjectAuthorPhoto(projectMock.owner.photoUrl);
      setTasks(projectMock.tasks);
  
  }

  useEffect(() => {
    getProject();
  }, []);

  const handleNovaTarefa = async () => {
    if (taskName.trim() !== '') {

      const tasksRef = database.ref(`projects/${id}/tasks`);

      const taskFirebase = await tasksRef.push({
        name: taskName,
        color: taskColor,
        status: 'a fazer',
      });

      const newTasks = tasks;

      // newTasks.push({
      //   id: taskFirebase.key!,
      //   name: taskName,
      //   color: taskColor,
      //   status: 'a fazer',
      // });

      setTasks(newTasks);

      setTaskColor('#000');
      setTaskName('');
      setTaskModal(false);
    }
    else {
      alert('Preencha todos os campos!');
    }
  }

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
      setTasks(items);
    }
  }

  const handleDragStart = () => {
  }

  const handleDeleteTask = async (task: Task) => {
  }

  const handleEditTask = async (task: Task) => {
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
      <Modal visible={taskModal} onHide={() => {
        setTaskModal(false);
        window.onscroll = function () { };
      }}>
        <ModalTaskContent>
          <span>Nova Tarefa</span>
          <div>
            <Input value={taskName} id={'task-name'} placeholder={'Tarefa'} setValue={setTaskName} />
            <input value={taskColor} type={'color'} id={'task-color'} onChange={(e) => { setTaskColor(e.target.value) }} />
          </div>
          <Button onclick={handleNovaTarefa} ><p>Criar</p></Button>
        </ModalTaskContent>
      </Modal>

      <Modal visible={infoModal} onHide={() => {
        setInfoModal(false);
        window.onscroll = function () { };
      }}>
        <ModalInfoContent>
          <img style={{width: "24px"}} src={projectAuthorPhoto} alt='author project photo' />
          <strong>{projectName}</strong>
          <p>{id}</p>
          <i>Participantes</i>
          <div>
            {projectMembers.map((member) => {
              return (
                <img key={member.id} src={member.photoURL} alt='member project photo' title={member.name} />
              );
            })}
          </div>
        </ModalInfoContent>
      </Modal>

      <Navbar>
        <Link to={'/'}>
          <FaArrowLeft color='#212121' />
        </Link>
        <Row gap='8px'>
          <ProjectTitle>{projectName}</ProjectTitle>
          <Tag onClick={() => {
            navigator.clipboard.writeText(id ?? "");
            toast.success('Project ID copied successfully!', {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              draggable: false,
              });
          }} size='small' label={id ?? ""}/>
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