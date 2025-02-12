import { useMutation } from '@tanstack/react-query'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

export const useProjectRespository = () => {
  const getProjectsOwnerMutation = useMutation({
    mutationFn: async () => {
      const data = await projectService.getProjectsOwner()
      return data ? data.map((data: any) => projectMapper(data)) : []
    },
  })

  return {
    getProjectsOwnerMutation,
  }
}
