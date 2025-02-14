export enum TaskStatus {
  COMPLETED,
  PENDING,
  DOING,
}

export const taskStatusFromString = {
  COMPLETED: TaskStatus.COMPLETED,
  PENDING: TaskStatus.PENDING,
  DOING: TaskStatus.DOING,
}

export const taskStatusToString = {
  [TaskStatus.COMPLETED]: 'COMPLETED',
  [TaskStatus.PENDING]: 'PENDING',
  [TaskStatus.DOING]: 'DOING',
}
