import { AuthenticationError } from 'apollo-server-express'
import type { MeType } from '../common/types'

export const authRequired = async<T>(
  me: MeType | null,
  next: (...args: any) => Promise<T>,
  ...args: any
): Promise<T> => {
  if (me) {
    return await next(...args)
  }
  throw new AuthenticationError('Authentication required')
}
