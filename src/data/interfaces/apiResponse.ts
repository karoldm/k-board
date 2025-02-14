import { Task } from './task'

export interface GetPaginationResponseAPI<T> {
  content: T
  last: boolean
  numberOfElements: number
  totalPages: number
  totalElements: number
}

export interface TasksResponse {
  pending: Task[]
  completed: Task[]
  doing: Task[]
  totalPending: number
  totalCompleted: number
  totalDoing: number
  total: number
}
