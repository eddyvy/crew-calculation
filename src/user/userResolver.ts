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

  const askRecoverPasswordResolver = async(parent: any, args: any, context: any, info: any) =>
    await askRecoverPassword(args.email)

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


  const updatePassword = async(email: string, oldPassword: string, newPassword: string): Promise<UserType | null> => {
    const userDB = await readOne(usersDbName, { email })
    const isPassCorrect = await bcrypt.compare(oldPassword, userDB.password)

    if (isPassCorrect) {
      const newPasswordHashed = await bcrypt.hash(newPassword, SALT_ROUNDS)
      return await updateOne(usersDbName, { email }, { ...userDB, password: newPasswordHashed })
    }

    return null
  }

  const updatePasswordResolver = async(parent: any, args: any, context: any, info: any) => {
    if (!context.me) return null
    return await updatePassword(context.me.email, args.oldPassword, args.newPassword)
  }

  return {
    Query: {
      authUser: authUserResolver,
      askRecoverPassword: askRecoverPasswordResolver,
    },
    Mutation: {
      createUser: createUserResolver,
      updatePassword: updatePasswordResolver,
    },
  }

}

