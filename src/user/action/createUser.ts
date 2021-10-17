import bcrypt from 'bcrypt'
import { DB_ENTITIES, SALT_ROUNDS } from '../../common/constants'
import type { CreateOne } from '../../database/CrudAdapaterType'
import type { UserInputType, UserType } from '../UserType'

export const createUser = async(userInput: UserInputType, password: string, createOne: CreateOne): Promise<(UserType | null)> => {
  const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS)
  const userWithPass = await createOne(DB_ENTITIES.USERS.name, { ...userInput, password: passwordHashed }) as UserType & { password: string }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: newPassword, ...user } = userWithPass

  return user as UserType
}
