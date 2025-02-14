import { taskStatusToString } from '../enums/taskStatus'
import { TasksResponse } from '../interfaces/apiResponse'
import { Task, TaskPayload } from '../interfaces/task'
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

  async createTask(projectId: string, data: TaskPayload): Promise<Task> {
    try {
      const result = await KBoardApi().post(`/task`, {
        projectId: projectId,
        title: data.title,
        description: data.description,
        color: data.color,
        tags: data.tags,
        membersId: data.members,
      })
      return result.data
    } catch (error) {
      console.error('createTask API error:', error)
      throw error
    }
  }

  async deleteTask(id: string): Promise<void> {
    try {
      await KBoardApi().delete(`/task/${id}`)
    } catch (error) {
      console.error('deleteTask API error:', error)
      throw error
    }
  }
}

export const taskService = new TaskService()
