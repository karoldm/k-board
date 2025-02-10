import { useReducer } from "react";
import { Task } from "../data/interfaces/task";

export type MemberPayload = {
  id: string;
  name: string;
}

type TaskState = {
  task: Omit<Task, 'id' | 'createdAt' | 'taskStatus' | 'members'> & {
    members: MemberPayload[];
  };
};

const initialState: TaskState = {
  task: {
    color: "#000",
    description: "",
    members: [],
    tags: [],
    title: "",
  }
}

type Type = 
  "title" | 
  "description" | 
  "color" | 
  "remove-member" | 
  "add-member" | 
  "remove-tag" |
  "add-tag" | 
  "reset";


type ActionWithPayload<T extends Type> = {
  type: T;
  payload:  
  T extends "title" | "description" | "color" | "add-tag" | "remove-tag" ?  string :
  T extends "add-member" | "remove-nmember" ? MemberPayload :
  T extends "reset" ? undefined :
  never;
}

const taskReducer = (
  state: TaskState, 
  action: ActionWithPayload<Type>
  ) => {
  const { task } = state;

  switch (action.type) {
    case "title":
    case "description":
    case "color":
      task[action.type] = action.payload as string;
      break;
    case "add-tag":
      task.tags = [...task.tags, action.payload as string];
      break;
    case "add-member":
      task.members = [...task.members, action.payload as MemberPayload];
      break;
    case "remove-tag": 
      task.tags = task.tags.filter(tag => tag !== action.payload as string);
      break;
    case "remove-member":
      task.members = task.members.filter(member => member.id !== (action.payload as MemberPayload).id);
      break;
    case "reset":
      task.members = [];
      task.tags = [];
      task.title = "";
      task.description = "";
      task.color = "#000";
  }  
  return { task: task };
}

export const useTaskReducer = () => {
  const [{ task }, dispatch] = useReducer(
    taskReducer,
    initialState
  );

  return {task, dispatch}
}