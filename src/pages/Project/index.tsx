import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { FaInfo, FaPlus } from 'react-icons/fa';

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';

import { database } from '../../services/firebase';

import { Navbar, ModalTaskContent, Wrapper, TaskWrapper, TaskContent, TaskContainer, Task, ModalInfoContent } from './style';


type Task = {
  name: string,
  status: string,
  color: string,
  id: string,
}

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

    const projectRef = database.ref(`projects/${id}`);

    projectRef.on('value', project => {
      const projectDatabase = project.val();

      setProjectName(projectDatabase.name);
      setProjectAuthorPhoto(projectDatabase.author.photoURL);

      const firebaseTasks: Task = projectDatabase.tasks ?? {};

      const parseTasks = Object.entries(firebaseTasks).map(([key, value]) => {
        const objectValue = (value as Object) as Task;
        return {
          id: key,
          name: objectValue.name,
          color: objectValue.color,
          status: objectValue.status,
        }
      })

      setTasks(parseTasks);

    });
  }

  const getProjectMembers = () => {

    const projectRef = database.ref(`projects/${id}`);

    projectRef.on('value', project => {
      const projectDatabase = project.val();

      const firebaseMembers: Member = projectDatabase.members ?? {};

      const parseMembers = Object.entries(firebaseMembers).map(([key, value]) => {
        const objectValue = (value as Object) as Member;
        return {
          id: key,
          name: objectValue.name,
          photoURL: objectValue.photoURL,
        }
      })

      setProjectMembers(parseMembers);

    });
  }

  useEffect(() => {
    getProject();
    getProjectMembers();

    return () => {
      setTasks([]);
      setProjectMembers([]);
    };
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

      newTasks.push({
        id: taskFirebase.key!,
        name: taskName,
        color: taskColor,
        status: 'a fazer',
      });

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
      await database.ref(`projects/${id}/tasks/${result.draggableId}`).update({
        status: result.destination.droppableId,
      });
    }
    else {
      const items = Array.from(tasks);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
      setTasks(items);

      await database.ref(`projects/${id}/tasks`).remove();

      const tasksRef = database.ref(`projects/${id}/tasks`);

      items.map(async (task: any) => {
        await tasksRef.push({
          name: task.name,
          color: task.color,
          status: task.status,
        });
      });
    }
  }

  const handleDragStart = () => {
  }

  const handleDeleteTask = async (idTask: string) => {
    await database.ref(`projects/${id}/tasks/${idTask}`).remove();
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
          <img src={projectAuthorPhoto} alt='author project photo' />
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
        <Link to={'/'}>voltar</Link>
        <div id="name-div">
          <span>{projectName}</span>
          <p>{id}</p>
        </div>
        <div id="button-div">
          <button onClick={() => {
            setTaskModal(true);
            disableScroll();
          }}>
            <FaPlus />
            <p>Nova Tarefa</p>
          </button>
          <button id="info-button" onClick={() => {
            setInfoModal(true);
            disableScroll();
          }}>
            <FaInfo />
          </button>
        </div>
      </Navbar>

      <TaskWrapper>

        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>

          <Droppable droppableId="a fazer">
            {(provided: any) => (
              <TaskContainer >
                <div className='title-task-container'>A FAZER</div>
                <TaskContent {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => {
                    if (task.status === "a fazer")
                      return (
                        <Draggable draggableId={task.id} key={task.id} index={index}>
                          {(provided: any) => (
                            <Task
                              color={task.color}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <button onClick={() => { handleDeleteTask(task.id) }}>X</button>
                              <p>{task.name}</p>
                            </Task>

                          )}
                        </Draggable>
                      )
                    else
                      return ' ';
                  })}
                </TaskContent>
              </TaskContainer>
            )}
          </Droppable>

          <Droppable droppableId="fazendo">
            {(provided: any) => (
              <TaskContainer >
                <div className='title-task-container'>FAZENDO</div>
                <TaskContent {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => {
                    if (task.status === "fazendo")
                      return (
                        <Draggable draggableId={task.id} key={task.id} index={index}>
                          {(provided: any) => (
                            <Task
                              color={task.color}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <button onClick={() => { handleDeleteTask(task.id) }}>X</button>
                              <p>{task.name}</p>
                            </Task>

                          )}
                        </Draggable>
                      )
                    else
                      return ' ';
                  })}
                </TaskContent>
              </TaskContainer>
            )}
          </Droppable>

          <Droppable droppableId="pronto">
            {(provided: any) => (
              <TaskContainer >
                <div className='title-task-container'>PRONTO</div>
                <TaskContent {...provided.droppableProps} ref={provided.innerRef}>
                  {tasks.map((task, index) => {
                    if (task.status === "pronto")
                      return (
                        <Draggable draggableId={task.id} key={task.id} index={index}>
                          {(provided: any) => (
                            <Task
                              color={task.color}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              <button onClick={() => { handleDeleteTask(task.id) }}>X</button>
                              <p>{task.name}</p>
                            </Task>

                          )}
                        </Draggable>
                      )
                    else
                      return ' ';
                  })}
                </TaskContent>
              </TaskContainer>
            )}
          </Droppable>

        </DragDropContext>

      </TaskWrapper>
    </Wrapper>
  );
}