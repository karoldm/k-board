import { Task } from './task'
import { User } from './user'

export interface Project {
  title: string
  tasks: Task[]
  createdAt: Date
  id: string | null
  owner: User
  members: User[]
  progress: number
}
