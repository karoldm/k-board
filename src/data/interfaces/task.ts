import { TaskStatus } from '../enums/taskStatus'
import { User } from './user'

export interface Task {
  title: string
  description: string
  createdAt: Date
  taskStatus: TaskStatus
  color: string
  tags: string[]
  id: string
  members: User[]
  createdBy: User
}

export type TaskPayload = Omit<
  Task,
  'id' | 'createdAt' | 'taskStatus' | 'members' | 'createdBy'
> & {
  members: string[]
}
