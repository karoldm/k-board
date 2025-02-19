import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TasksResponse } from '../interfaces/apiResponse'
import { Task, TaskPayload } from '../interfaces/task'
import { taskMapper } from '../mappers/taskMapper'
import { taskService } from '../services/taskService'

export const useTasksByProject = (projectId: string) => {
  return useQuery<TasksResponse>({
    queryKey: ['getTasksByProject'],
    queryFn: async () => taskService.getTasksByProject(projectId),
  })
}

export const useEditTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (payload: Task) =>
      taskService.editTask(payload.id, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      projectId,
      payload,
    }: {
      projectId: string
      payload: TaskPayload
    }) => taskMapper(await taskService.createTask(projectId, payload)),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => taskService.deleteTask(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })
}
