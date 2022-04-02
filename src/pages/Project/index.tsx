import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Modal } from '../../components/Modal';
import { Task } from '../../components/Task';
import { database } from '../../services/firebase';

import { Navbar, ModalContent, TaskContainer, Wrapper, TaskContent, TaskWrapper } from './style';


type Task = {
  name: string,
  status: string,
  color: string,
  id: string,
}

export const Project: React.FC = () => {
  const { id } = useParams();

  const [modal, setModal] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectAuthorPhoto, setProjectAuthorPhoto] = useState('');
  const [projectMembersPhotos, setProjectMembersPhoto] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const [taskName, setTaskName] = useState('');
  const [taskColor, setTaskColor] = useState('#000');
  const [taskStatus, setTaskStatus] = useState('');

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

  useEffect(() => {
    getProject();
  }, []);

  const handleNovaTarefa = async () => {
    if (taskName.trim() != '') {

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
      setModal(false);
    }
    else {
      alert('Preencha todos os campos!');
    }
  }

  const handleDeleteTask = async (idTask: string) => {
    await database.ref(`projects/${id}/tasks/${idTask}`).remove();
  }

  return (
    <Wrapper>
      <Modal visible={modal} onHide={() => setModal(false)}>
        <ModalContent>
          <span>Nova Tarefa</span>
          <div>
            <Input value={taskName} id={'task-name'} placeholder={'Tarefa'} setValue={setTaskName} />
            <input value={taskColor} type={'color'} id={'task-color'} onChange={(e) => { setTaskColor(e.target.value) }} />
          </div>
          <Button onclick={handleNovaTarefa} ><p>Criar</p></Button>
        </ModalContent>
      </Modal>
      <Navbar>
        <Link to={'/'}>voltar</Link>
        <div>
          <span>{projectName}</span>
          <p>{id}</p>
        </div>
        <button onClick={() => setModal(true)}>
          <p>+</p>
          <p>Nova Tarefa</p>
        </button>
      </Navbar>
      <TaskWrapper>
        <TaskContainer>
          <div className='title-task-container'>A FAZER</div>
          <TaskContent>
            {tasks.map((task) => {
              if (task.status === 'a fazer')
                return <Task
                  key={task.id}
                  name={task.name}
                  background={task.color}
                  deleteTask={() => handleDeleteTask(task.id)}
                />
            }
            )}
          </TaskContent>
        </TaskContainer>
        <TaskContainer>
          <div className='title-task-container'>FAZENDO</div>
          <TaskContent>
            {tasks.map((task) => {
              if (task.status === 'fazendo')
                return <Task
                  key={task.id}
                  name={task.name}
                  background={task.color}
                  deleteTask={() => handleDeleteTask(task.id)}
                />
            }
            )}
          </TaskContent>
        </TaskContainer>
        <TaskContainer>
          <div className='title-task-container'>PRONTO</div>
          <TaskContent>
            {tasks.map((task) => {
              if (task.status === 'pronto')
                return <Task
                  key={task.id}
                  name={task.name}
                  background={task.color}
                  deleteTask={() => handleDeleteTask(task.id)}
                />
            }
            )}
          </TaskContent>
        </TaskContainer>
      </TaskWrapper>
    </Wrapper>
  );
}