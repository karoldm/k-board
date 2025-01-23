import { useState } from "react";
import { onCLS } from "web-vitals";
import { TaskStatus } from "../../../data/enums/taskStatus";
import { Task } from "../../../data/interfaces/task";
import { Button } from "../Button";
import { Input } from "../Input";
import { ModalTaskContent } from "./style";

type Props = {
  onConfirm: (task: any) => void;
}

export const NewTaskModal = ({onConfirm}: Props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [members, setMembers] = useState([]);
  const [color, setColor] = useState("");

  const handleConfirm = () => {
    onConfirm({
      color: color, 
      description: description,
      members: members,
      tags: tags, 
      title: title,
      taskStatus: TaskStatus.PENDING,
    });
  }

  return (
    <ModalTaskContent>
    <span>Nova Tarefa</span>
    <div>
      <Input value={title} id={'task-name'} placeholder={'Tarefa'} setValue={setTitle} />
      <Input value={description} id={'task-description'} placeholder={'Descrição'} setValue={setDescription} />
      <input value={color} type={'color'} id={'task-color'} onChange={(e) => { setColor(e.target.value) }} />
    </div>
    <Button onclick={handleConfirm} ><p>Criar</p></Button>
  </ModalTaskContent>
  );
}