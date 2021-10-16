import { UserInputType, UserType } from '../UserType'
import { UpdateOne } from '../../common/types'
import { DB_ENTITIES, JWT_SECRET } from '../../common/constants'
import jwt from 'jsonwebtoken'

export const updateUser = async(
  updatedUser: UserInputType,
  userId: string,
  updateOne: UpdateOne
): Promise<{ updatedUser: UserType, updatedToken: string } | null> => {
  const userDb = await updateOne(DB_ENTITIES.USERS.name, { _id: userId }, { ...updatedUser }) as UserType
  const token = jwt.sign({ _id: userDb._id.toString(), name: userDb.name, email: userDb.email }, JWT_SECRET)
  return {
    updatedUser: userDb,
    updatedToken: token,
  }
}
