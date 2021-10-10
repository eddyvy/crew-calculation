import type { CrudAdapter } from '../common/types'
import type { UserType } from './UserType'

export const userResolver = (crudAdapter: CrudAdapter) => {
  const getUser = (): UserType => ({
    id: 1,
    name: 'Ali',
    email: 'aplaza@example.com',
    company: 'Iberojet',
  })

  // const newUser = (user: UserType, password: string): UserType => {
  //
  // }

  return {
    Query: {
      user: getUser,
    },
    // Mutation: {
    //   newUser: newUser,
    // },
  }

}

