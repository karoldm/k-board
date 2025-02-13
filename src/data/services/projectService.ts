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

  async createProject(title: string) {
    try {
      const result = await KBoardApi().post('/project', { title })
      return result.data
    } catch (error) {
      console.error('getProjectsOwner API error:', error)
      throw error
    }
  }
}

export const projectService = new ProjectService()
