import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { DB_ENTITIES, JWT_SECRET } from '../../common/constants'
import type { ReadOne } from '../../database/CrudAdapaterType'
import type { UserType } from '../UserType'

export const authUser = async(email: string, password: string, readOne: ReadOne): Promise<string | null> => {
  const userDB = await readOne(DB_ENTITIES.USERS.name, { email }) as UserType & { password: string }
  const isPassCorrect = await bcrypt.compare(password, userDB.password)

  return (isPassCorrect)
    ? jwt.sign({ id: userDB.id, name: userDB.name, email: userDB.email }, JWT_SECRET)
    : null
}
