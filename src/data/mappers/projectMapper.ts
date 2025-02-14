import { Project } from '../interfaces/project'
import { simpleUserMapper } from './userMapper'

export const projectMapper = (data: Record<string, any>) => {
  const project: Project = {
    id: data['id'],
    title: data['title'],
    createdAt: data['createdAt'],
    members: data['members'],
    owner: simpleUserMapper(data['owner']),
    progress: data['progress'],
    tasks: [],
  }
  return project
}
