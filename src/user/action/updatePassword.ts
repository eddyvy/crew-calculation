import bcrypt from 'bcrypt'
import type { ReadOne, UpdateOne } from '../../common/types'
import { DB_ENTITIES, SALT_ROUNDS } from '../../common/constants'
import type { UserType } from '../UserType'

export const updatePassword = async(
  email: string,
  oldPassword: string,
  newPassword: string,
  readOne: ReadOne,
  updateOne: UpdateOne
): Promise<UserType | null> => {

  const userDB = await readOne(DB_ENTITIES.USERS.name, { email })
  const isPassCorrect = await bcrypt.compare(oldPassword, userDB.password)

  if (isPassCorrect) {
    const newPasswordHashed = await bcrypt.hash(newPassword, SALT_ROUNDS)
    return await updateOne(DB_ENTITIES.USERS.name, { email }, { ...userDB, password: newPasswordHashed })
  }

  return null
}
