import bcrypt from 'bcrypt'
import type { ReadOne, UpdateOne } from '../../database/DbTypes'
import { DB_ENTITIES, SALT_ROUNDS } from '../../common/constants'
import type { UserType } from '../UserType'

export const updatePassword = async(
  email: string,
  oldPassword: string,
  newPassword: string,
  readOne: ReadOne,
  updateOne: UpdateOne
): Promise<UserType | null> => {
  const userDB = await readOne(DB_ENTITIES.USERS.name, { email }) as UserType & { password: string }
  const isPassCorrect = await bcrypt.compare(oldPassword, userDB.password)

  if (isPassCorrect) {
    const newPasswordHashed = await bcrypt.hash(newPassword, SALT_ROUNDS)
    const userWithPass = await updateOne(
      DB_ENTITIES.USERS.name,
      { id: userDB.id },
      { password: newPasswordHashed }
    ) as UserType & { password: string }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = userWithPass

    return user as UserType
  }

  return null
}
