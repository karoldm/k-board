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
