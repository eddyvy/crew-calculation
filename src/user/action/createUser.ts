import bcrypt from 'bcrypt'
import type { CreateOne } from '../../common/types'
import { DB_ENTITIES, SALT_ROUNDS } from '../../common/constants'
import type { UserInputType, UserType } from '../UserType'

export const createUser = async(newUser: UserInputType, password: string, createOne: CreateOne): Promise<(UserType | null)> => {
  const passwordHashed = await bcrypt.hash(password, SALT_ROUNDS)
  return await createOne(DB_ENTITIES.USERS.name, { ...newUser, password: passwordHashed })
}
