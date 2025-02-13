import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Project } from '../interfaces/project'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

export const useProjectRespository = () => {
  const queryClient = useQueryClient()

  const getProjectsOwnerQuery = useQuery<Project[]>({
    queryKey: ['getProjectsOwner'],
    queryFn: async () => {
      const data = await projectService.getProjectsOwner()
      return data?.map((data: any) => projectMapper(data)) || []
    },
  })

  const getProjectsParticipationQuery = useQuery<Project[]>({
    queryKey: ['getProjectsParticipation'],
    queryFn: async () => {
      const data = await projectService.getProjectsParticipation()
      return data?.map((data: any) => projectMapper(data)) || []
    },
  })

  const createProjectMutation = useMutation({
    mutationFn: async (title: string) => {
      const data = await projectService.createProject(title)
      return projectMapper(data)
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData(['getProjectsOwner'], (oldData: any) => {
        return oldData ? [...oldData, newProject] : [newProject]
      })
    },
  })

  const enterProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      const data = await projectService.enterProject(id)
      return projectMapper(data)
    },
    onSuccess: (newProject) => {
      queryClient.setQueryData(['getProjectsParticipation'], (oldData: any) => {
        return oldData ? [...oldData, newProject] : [newProject]
      })
    },
  })

  const editProjectMutation = useMutation({
    mutationFn: async ({ id, title }: { id: string; title: string }) => {
      const data = await projectService.editProject(id, title)
      return projectMapper(data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjectsOwner'] })
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await projectService.deleteProject(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjectsOwner'] })
    },
  })

  return {
    createProjectMutation,
    enterProjectMutation,
    getProjectsOwnerQuery,
    getProjectsParticipationQuery,
    editProjectMutation,
    deleteProjectMutation,
  }
}
