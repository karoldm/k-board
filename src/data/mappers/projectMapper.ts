import { Project } from '../interfaces/project'
import { User } from '../interfaces/user'

const ownerMap = (data: Record<string, any>) => {
  const owner: User = {
    id: data['id'],
    email: data['email'],
    name: data['name'],
    photoUrl: data['photo'],
    createdAt: data['createdAt'],
  }
  return owner
}
export const projectMapper = (data: Record<string, any>) => {
  const project: Project = {
    id: data['id'],
    title: data['title'],
    createdAt: data['createdAt'],
    members: data['members'],
    owner: ownerMap(data['owner']),
    progress: data['progress'],
    tasks: [],
  }
  return project
}
