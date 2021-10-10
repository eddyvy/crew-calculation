import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { CrudAdapter, Me } from '../common/types'
import type { UserType } from './UserType'
import CONSTANTS from '../common/constants'

export const userResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const usersDbName = CONSTANTS.DB_ENTITIES.USERS.name
  const { SALT_ROUNDS, JWT_SECRET } = CONSTANTS
  const { createOne, readOne } = crudAdapter

  const authUser = async(email: string, password: string): Promise<string | null> => {
    const userDB = await readOne(usersDbName, { email })
    const isPassCorrect = await bcrypt.compare(password, userDB.password)

    if (isPassCorrect) return jwt.sign({ name: userDB.name, email: userDB.email }, JWT_SECRET)

    return null
  }

  const authUserResolver = async(parent: any, args: any, context: any, info: any) =>
    await authUser(args.email, args.password)

  const createUser = async(newUser: UserType, password: string): Promise<(UserType | null)> => {
    const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS)
    return await createOne(usersDbName, { ...newUser, password: passwordHashed })
  }

  const createUserResolver = async(parent: any, args: any, context: any, info: any) =>
    await createUser(args.newUser, args.password)

  return {
    Query: {
      authUser: authUserResolver,
    },
    Mutation: {
      createUser: createUserResolver,
    },
  }

}

