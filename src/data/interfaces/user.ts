import { UserAuth } from './userAuth'

export type User = Omit<UserAuth, 'token'>
