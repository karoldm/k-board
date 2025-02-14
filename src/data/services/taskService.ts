import { taskStatusToString } from '../enums/taskStatus'
import { TasksResponse } from '../interfaces/apiResponse'
import { Task } from '../interfaces/task'
import { KBoardApi } from './kboardApi'

class TaskService {
  async getTasksByProject(
    projectId: string,
    filter?: string
  ): Promise<TasksResponse> {
    try {
      const result = await KBoardApi().get(
        `/task/${projectId}?filter=${filter ?? ''}`
      )
      return result.data
    } catch (error) {
      console.error('getProjectsOwner API error:', error)
      throw error
    }
  }

  async editTask(taskId: string, data: Task): Promise<TasksResponse> {
    try {
      const result = await KBoardApi().put(`/task/${taskId}`, {
        status: taskStatusToString[data.taskStatus],
        title: data.title,
        description: data.description,
        color: data.color,
        tags: data.tags,
        responsible: data.members.map((member) => member.id),
      })
      return result.data
    } catch (error) {
      console.error('editTask API error:', error)
      throw error
    }
  }
}

export const taskService = new TaskService()
