import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import CONSTANTS from '../common/constants'
import type { CrudAdapter } from '../common/types'
import type { UserType } from './UserType'

export const userResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const usersDbName = CONSTANTS.DB_ENTITIES.USERS
  const { createOne } = crudAdapter

  const getUser = (): UserType => ({
    id: 1,
    name: 'Ali',
    email: 'aplaza@example.com',
    company: 'Iberojet',
  })

  const createUser = async(newUser: UserType, password: string): Promise<(UserType | null)> => {
    return await createOne(usersDbName, { ...newUser, password })
  }

  const createUserResolver = async(parent: any, args: any, context: any, info: any) =>
    await createUser(args.newUser, args.password)

  return {
    Query: {
      user: getUser,
    },
    Mutation: {
      createUser: createUserResolver,
    },
  }

}

