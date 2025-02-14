import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TasksResponse } from '../interfaces/apiResponse'
import { Task, TaskPayload } from '../interfaces/task'
import { taskMapper } from '../mappers/taskMapper'
import { taskService } from '../services/taskService'

type Props = {
  projectId?: string
  filter?: string
}

export const useTaskRepository = ({ projectId, filter }: Props) => {
  const queryClient = useQueryClient()

  const getTasksByProjectQuery = useQuery<TasksResponse>({
    queryKey: ['getTasksByProject', filter],
    queryFn: async () => {
      const data = await taskService.getTasksByProject(projectId ?? '', filter)
      return data
    },
    enabled: !!filter || filter === '', // Avoids refetching on every render
  })

  const editTaskMutation = useMutation({
    mutationFn: async (payload: Task) => {
      const data = await taskService.editTask(payload.id, payload)
      return data
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })

  const createTaskMutation = useMutation({
    mutationFn: async ({
      projectId,
      payload,
    }: {
      projectId: string
      payload: TaskPayload
    }) => {
      const data = await taskService.createTask(projectId, payload)
      return taskMapper(data)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })

  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => {
      await taskService.deleteTask(id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })

  return {
    getTasksByProjectQuery,
    editTaskMutation,
    createTaskMutation,
    deleteTaskMutation,
  }
}
