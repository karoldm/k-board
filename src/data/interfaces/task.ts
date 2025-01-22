import { TaskStatus } from '../enums/taskStatus';

export interface Task { 
  title: string;
  description: string;
  createdAt: Date;
  taskStatus: TaskStatus;
  color: string;
  tags: string[];
  id: string;
}