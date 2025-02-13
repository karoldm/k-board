export interface GetResponseAPI<T> {
  content: T
  last: boolean
  numberOfElements: number
  totalPages: number
  totalElements: number
}
