import { taskStatusFromString } from '../enums/taskStatus'
import { Task } from '../interfaces/task'
import { simpleUserMapper } from './userMapper'

export const taskMapper = (data: Record<string, any>) => {
  const task: Task = {
    id: data['id'],
    title: data['title'],
    createdAt: data['createdAt'],
    members: data['members'],
    createdBy: simpleUserMapper(data['createdBy']),
    tags: data['tags'],
    color: data['color'],
    description: data['description'],
    taskStatus:
      taskStatusFromString[data['status'] as 'PENDING' | 'DOING' | 'COMPLETED'],
  }
  return task
}
