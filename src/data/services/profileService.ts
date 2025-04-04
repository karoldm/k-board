import { taskStatusToString } from '../enums/taskStatus'
import { PasswordEditPayload, ProfileEditPayload } from '../interfaces/profile'
import { User } from '../interfaces/user'
import { KBoardApi } from './kboardApi'

class ProfileService {

  async editProfile(payload: ProfileEditPayload): Promise<User> {
    try {
        const formData = new FormData()
        formData.append('name', payload.name)

        if (payload.photo) {
          formData.append('photo', payload.photo)
        }
  
        const result = await KBoardApi().put('/user', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
  
        return result.data
    } catch (error) {
      console.error('editProfile API error:', error)
      throw error
    }
  }

  async editPassword(payload: PasswordEditPayload): Promise<void> {
    try {
        const result = await KBoardApi().put('/user/password', payload)
  
        return result.data
    } catch (error) {
      console.error('editPassword API error:', error)
      throw error
    }
  }

}

export const profileService = new ProfileService()
