import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

export const useProjectRespository = (
  projectsPage: number,
  projectsParticipationPage: number
) => {
  const queryClient = useQueryClient()

  const getProjectsOwnerQuery = useQuery({
    queryKey: ['getProjectsOwner', projectsPage],
    queryFn: async () => {
      const data = await projectService.getProjectsOwner(projectsPage)
      return data
    },
  })

  const getProjectsParticipationQuery = useQuery({
    queryKey: ['getProjectsParticipation', projectsParticipationPage],
    queryFn: async () => {
      const data = await projectService.getProjectsParticipation(
        projectsParticipationPage
      )
      return data
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
      queryClient.invalidateQueries({
        queryKey: ['getProjectsOwner', projectsPage],
      })
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await projectService.deleteProject(id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['getProjectsOwner', projectsPage],
      })
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
