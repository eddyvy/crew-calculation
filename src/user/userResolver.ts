import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { CrudAdapter } from '../common/types'
import type { UserType } from './UserType'
import CONSTANTS from '../common/constants'
import { sendEmail } from '../email/sendEmail'

export const userResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const usersDbName = CONSTANTS.DB_ENTITIES.USERS.name
  const { SALT_ROUNDS, JWT_SECRET } = CONSTANTS
  const { createOne, readOne, updateOne } = crudAdapter

  const askRecoverPassword = async(email: string): Promise<string> => {
    try {
      const userDB = await readOne(usersDbName, { email })
      const token = jwt.sign({ name: userDB.name, email: userDB.email }, JWT_SECRET)
      await sendEmail(email, token)
      return 'Email sent correctly'
    } catch (error) {
      console.log('Error sending email:', error)
      return 'Error occurred'
    }
  }

  const authUser = async(email: string, password: string): Promise<string | null> => {
    const userDB = await readOne(usersDbName, { email })
    const isPassCorrect = await bcrypt.compare(password, userDB.password)

    return (isPassCorrect)
      ? jwt.sign({ name: userDB.name, email: userDB.email }, JWT_SECRET)
      : null
  }

  const createUser = async(newUser: UserType, password: string): Promise<(UserType | null)> => {
    const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS)
    return await createOne(usersDbName, { ...newUser, password: passwordHashed })
  }

  const updatePassword = async(email: string, oldPassword: string, newPassword: string): Promise<UserType | null> => {
    const userDB = await readOne(usersDbName, { email })
    const isPassCorrect = await bcrypt.compare(oldPassword, userDB.password)

    if (isPassCorrect) {
      const newPasswordHashed = await bcrypt.hash(newPassword, SALT_ROUNDS)
      return await updateOne(usersDbName, { email }, { ...userDB, password: newPasswordHashed })
    }

    return null
  }

  const useUserResolvers = async(parent: any, args: any, context: any, info: any) => {
    // Name of the query/mutation called
    const { fieldName } = info

    switch (fieldName) {
      case 'authUser':
        return await authUser(args.email, args.password)
      case 'askRecoverPassword':
        return await askRecoverPassword(args.email)
      case 'createUser':
        return await createUser(args.newUser, args.password)
      case 'updatePassword':
        return (context.me)
          ? await updatePassword(context.me.email, args.oldPassword, args.newPassword)
          : null
    }
  }

  return {
    Query: {
      authUser: useUserResolvers,
      askRecoverPassword: useUserResolvers,
    },
    Mutation: {
      createUser: useUserResolvers,
      updatePassword: useUserResolvers,
    },
  }

}

