import { UserInputType, UserType } from '../UserType'
import type { UpdateOne } from '../../database/DbTypes'
import { DB_ENTITIES, JWT_SECRET } from '../../common/constants'
import jwt from 'jsonwebtoken'

export const updateUser = async(
  updatedUser: UserInputType,
  userId: string,
  updateOne: UpdateOne
): Promise<{ updatedUser: UserType, updatedToken: string } | null> => {
  const userDb = await updateOne(
    DB_ENTITIES.USERS.name,
    { id: userId },
    { ...updatedUser }
  ) as UserType & { password: string }
  const token = jwt.sign({ id: userDb.id, name: userDb.name, email: userDb.email }, JWT_SECRET)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...user } = userDb
  return {
    updatedUser: user as UserType,
    updatedToken: token,
  }
}
