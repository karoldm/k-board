import { KBoardApi } from './kboardApi'

class ProjectService {
  async getProjectsOwner() {
    try {
      const result = await KBoardApi().get('/project/owner')
      return result.data
    } catch (error) {
      console.error('getProjectsOwner API error:', error)
      throw error
    }
  }

  async getProjectsParticipation() {
    try {
      const result = await KBoardApi().get('/project/member')
      return result.data
    } catch (error) {
      console.error('getProjectsParticipation API error:', error)
      throw error
    }
  }

  async createProject(title: string) {
    try {
      const result = await KBoardApi().post('/project', { title })
      return result.data
    } catch (error) {
      console.error('createProject API error:', error)
      throw error
    }
  }

  async enterProject(id: string) {
    try {
      const result = await KBoardApi().post('/project/member', {
        projectId: id,
      })
      return result.data
    } catch (error) {
      console.error('enterProject API error:', error)
      throw error
    }
  }

  async editProject(id: string, title: string) {
    try {
      const result = await KBoardApi().put(`/project/${id}`, {
        title,
      })
      return result.data
    } catch (error) {
      console.error('editProject API error:', error)
      throw error
    }
  }

  async deleteProject(id: string) {
    try {
      await KBoardApi().delete(`/project/${id}`)
    } catch (error) {
      console.error('deleteProject API error:', error)
      throw error
    }
  }
}

export const projectService = new ProjectService()
