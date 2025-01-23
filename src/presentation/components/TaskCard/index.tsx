import React, { forwardRef } from 'react';
import { FaTimes } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Task } from "../../../data/interfaces/task";
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Row } from "../Layouts/Row";
import { MembersList } from '../MembersList';
import { Tag } from "../Tag";
import { TaskContainer } from "./style";

type Props = {
  task: Task;
}

export const TaskCard = forwardRef<HTMLDivElement, Props>(
    ({ task, ...props}: Props, ref) => {
  
  return (
    <TaskContainer ref={ref} {...props} color={task.color}>
      <Button id="close-button" onclick={() => {}} variant="secondary" noBorder width='auto'>
        <FaTimes color="#CCC" size={12} />
      </Button>
      <p id="title">{task.title}</p>
      <p id="description">{task.description}</p>
      <Row justifyContent="start">
        {task.tags.
          map((tag) => 
            <Tag size="small" key={tag} label={tag} />
        )}
      </Row>
      <MembersList members={task.members} />
    </TaskContainer>
  );
});