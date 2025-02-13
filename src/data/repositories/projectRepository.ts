import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Project } from '../interfaces/project'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

export const useProjectRespository = () => {
  const queryClient = useQueryClient()

  const getProjectsOwnerMutation = useQuery<Project[]>({
    queryKey: ['getProjectsOwner'],
    queryFn: async () => {
      const data = await projectService.getProjectsOwner()
      return data?.map((data: any) => projectMapper(data)) || []
    },
  })

  const createProject = useMutation({
    mutationFn: async (title: string) => {
      const data = await projectService.createProject(title)
      return projectMapper(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjectsOwner'] })
    },
  })

  return {
    getProjectsOwnerMutation,
    createProject,
  }
}
