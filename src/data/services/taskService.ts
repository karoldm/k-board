import { TasksResponse } from '../interfaces/apiResponse'
import { KBoardApi } from './kboardApi'

class TaskService {
  async getTasksByProject(
    projectId: string,
    filter?: string
  ): Promise<TasksResponse> {
    try {
      await new Promise((resolve) => setTimeout(resolve, 100))

      const result = await KBoardApi().get(
        `/task/${projectId}?filter=${filter ?? ''}`
      )
      return result.data
    } catch (error) {
      console.error('getProjectsOwner API error:', error)
      throw error
    }
  }
}

export const taskService = new TaskService()
