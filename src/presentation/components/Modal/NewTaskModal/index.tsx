import {  useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Project } from "../../../../data/interfaces/project";
import { useTaskReducer } from "../../../hooks/useTaskReducer";
import { withCopy } from "../../../hooks/withCopy";
import { Button } from "../../Button";
import { DropdownSelect } from "../../DropdownSelect";
import { Input } from "../../Input";
import { Column } from "../../Layouts/Column";
import { Row } from "../../Layouts/Row";
import { Tag } from "../../Tag";
import { ModalTaskContent } from "./style";

type Props = {
  onConfirm: (task: any) => void;
  project: Project;
}

export const NewTaskModal = ({onConfirm, project}: Props) => {
  const {task, dispatch} = useTaskReducer();
  const [tagText, setTagText] = useState("");

  const handleConfirm = () => {
    if(!task) return;

    onConfirm({
      color: task.color, 
      description: task.description,
      members: task.members,
      tags: task.tags, 
      title: task.title,
    });
  }

  const addTag = () => {
    if(tagText.trim().length == 0) return;
    dispatch({type: 'add-tag', payload: tagText});
    setTagText("");
  }

  return (
    <ModalTaskContent gap="8px">
      <Column alignItems="start" fullWidth gap="8px" >
        <Input 
          value={task?.title ?? ""} 
          id='task-name'
          placeholder='Tarefa' 
          setValue={
            (value: string) => dispatch({type: 'title', payload: value})
          } 
        />
        <Input 
          value={task?.description ?? ""} 
          id='task-description'
          placeholder='Descrição'
          setValue={
            (value: string) => dispatch({type: 'description', payload: value})
          } 
        />
        <Row gap="8px">
          <input 
            value={task?.color ?? ""} 
            type='color' 
            onChange={
              (e) => dispatch({type: 'color', payload: e.target.value})
            }
          />
          {withCopy(<Tag color={task.color} label={task.color} />, task.color)}
        </Row>
      </Column>
      <Row gap="8px" fullWidth>
        <Input 
          value={tagText} 
          id='task-name' 
          placeholder='Tag'
          setValue={setTagText} 
        />
        <Button width="auto" onclick={addTag}>
          <FaPlus size={18} color="white" />
        </Button>
      </Row>
      <Row wrap gap="8px">
        {
          task.tags.map(tag => 
            <Tag 
              onRemove={() => {
                dispatch({type: "remove-tag", payload: tag});
              }} 
              key={tag}
              size="small"
              label={tag} 
            /> 
          )
        }
      </Row>
      <DropdownSelect
        options={project.members.map(member => {
          return {
            value: member.id,
            label: member.name,
          }
        })}
        onSelect={(option)=>{
          dispatch({type: 'add-member', payload: {id: option.value, name: option.label}});
        }} 
      />
      <Row fullWidth wrap gap="8px">
        {task.members.map((member)=> 
          <Tag
            onRemove={() => {
              dispatch({type: "remove-member", payload: member});
            }}
            size="small"
            label={member.name} 
          /> 
        )}
      </Row>
      <Button onclick={handleConfirm} ><p>Criar</p></Button>
  </ModalTaskContent>
  );
}