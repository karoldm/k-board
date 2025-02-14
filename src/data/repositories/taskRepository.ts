import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { TasksResponse } from '../interfaces/apiResponse'
import { Task } from '../interfaces/task'
import { taskService } from '../services/taskService'

export const useTaskRespository = (projectId?: string, filter?: string) => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTasksByProject'] })
    },
  })

  return {
    getTasksByProjectQuery,
    editTaskMutation,
  }
}
