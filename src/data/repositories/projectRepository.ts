import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetPaginationResponseAPI } from '../interfaces/apiResponse'
import { Project } from '../interfaces/project'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

export const useProjectsOwner = (projectsPage?: number, filter?: string) => {
  return useQuery<GetPaginationResponseAPI<Project[]>>({
    queryKey: ['getProjectsOwner', projectsPage, filter],
    queryFn: async () => projectService.getProjectsOwner(projectsPage, filter),
    enabled: !!filter || filter === '',
  })
}

export const useProjectsParticipation = (
  projectsParticipationPage?: number,
  filter?: string
) => {
  return useQuery<GetPaginationResponseAPI<Project[]>>({
    queryKey: ['getProjectsParticipation', projectsParticipationPage, filter],
    queryFn: async () =>
      projectService.getProjectsParticipation(
        projectsParticipationPage,
        filter
      ),
    enabled: !!filter || filter === '',
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (title: string) =>
      projectMapper(await projectService.createProject(title)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjectsOwner'] })
    },
  })
}

export const useEnterProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) =>
      projectMapper(await projectService.enterProject(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getProjectsParticipation'] })
    },
  })
}

export const useEditProject = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({
      id,
      title,
      membersToRemove,
    }: {
      id: string
      title: string
      membersToRemove: string[]
    }) =>
      projectMapper(
        await projectService.editProject(id, title, membersToRemove)
      ),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['getProjectsOwner'] })
    },
  })
}

export const useDeleteProject = (projectsPage?: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: string) => projectService.deleteProject(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getProjectsOwner'],
      })
    },
  })
}

export const useProjectById = (projectId?: string, filter?: string) => {
  return useQuery({
    queryKey: ['getProjectByIdQuery', projectId],
    queryFn: async () =>
      projectMapper(await projectService.getById(projectId!)),
    enabled: !!filter || filter === '' || !!projectId || projectId === '',
  })
}
