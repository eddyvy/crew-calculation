import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import type { ReadOne } from '../../common/types'
import { DB_ENTITIES, JWT_SECRET } from '../../common/constants'

export const authUser = async(email: string, password: string, readOne: ReadOne): Promise<string | null> => {
  const userDB = await readOne(DB_ENTITIES.USERS.name, { email })
  const isPassCorrect = await bcrypt.compare(password, userDB.password)

  return (isPassCorrect)
    ? jwt.sign({ _id: userDB._id.toString(), name: userDB.name, email: userDB.email }, JWT_SECRET)
    : null
}
