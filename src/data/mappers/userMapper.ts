import { User } from '../interfaces/user'
import { UserAuth } from '../interfaces/userAuth'

export const userMapper = (data: Record<string, any>) => {
  const userData = data['user']
  const user: UserAuth = {
    id: userData['id'],
    email: userData['email'],
    name: userData['name'],
    photoUrl: userData['photo'],
    createdAt: userData['createdAt'],
    token: data['token'],
  }
  return user
}

export const simpleUserMapper = (data: Record<string, any>) => {
  const user: User = {
    id: data['id'],
    email: data['email'],
    name: data['name'],
    photoUrl: data['photo'],
    createdAt: data['createdAt'],
  }
  return user
}
