import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { GetPaginationResponseAPI } from '../interfaces/apiResponse'
import { Project } from '../interfaces/project'
import { projectMapper } from '../mappers/projectMapper'
import { projectService } from '../services/projectService'

type Props = {
  projectsPage?: number
  projectsParticipationPage?: number
  filter?: string
  projectId?: string
}

export const useProjectRespository = ({
  projectsPage,
  projectsParticipationPage,
  filter,
  projectId,
}: Props) => {
  const queryClient = useQueryClient()

  const getProjectsOwnerQuery = useQuery<GetPaginationResponseAPI<Project[]>>({
    queryKey: ['getProjectsOwner', projectsPage, filter],
    queryFn: async () => {
      const data = await projectService.getProjectsOwner(projectsPage, filter)
      return data
    },
    enabled: !!filter || filter === '', // Avoids refetching on every render
  })

  const getProjectsParticipationQuery = useQuery<
    GetPaginationResponseAPI<Project[]>
  >({
    queryKey: ['getProjectsParticipation', projectsParticipationPage, filter],
    queryFn: async () => {
      const data = await projectService.getProjectsParticipation(
        projectsParticipationPage,
        filter
      )
      return data
    },
    enabled: !!filter || filter === '', // Avoids refetching on every render
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
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getProjectsOwner', projectsPage],
      })
    },
  })

  const deleteProjectMutation = useMutation({
    mutationFn: async (id: string) => {
      await projectService.deleteProject(id)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['getProjectsOwner', projectsPage],
      })
    },
  })

  const getProjectByIdQuery = useQuery({
    queryKey: ['getProjectByIdQuery'],
    queryFn: async () => {
      const data = await projectService.getById(projectId!)
      return projectMapper(data)
    },
  })

  return {
    createProjectMutation,
    enterProjectMutation,
    getProjectsOwnerQuery,
    getProjectsParticipationQuery,
    editProjectMutation,
    deleteProjectMutation,
    getProjectByIdQuery,
  }
}
