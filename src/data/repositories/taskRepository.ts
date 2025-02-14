import { useQuery, useQueryClient } from '@tanstack/react-query'
import { TasksResponse } from '../interfaces/apiResponse'
import { taskService } from '../services/taskService'

export const useTaskRespository = (projectId: string, filter?: string) => {
  const queryClient = useQueryClient()

  const getTasksByProjectQuery = useQuery<TasksResponse>({
    queryKey: ['getTasksByProject', filter],
    queryFn: async () => {
      const data = await taskService.getTasksByProject(projectId, filter)
      return data
    },
    enabled: !!filter || filter === '', // Avoids refetching on every render
  })

  return {
    getTasksByProjectQuery,
  }
}
