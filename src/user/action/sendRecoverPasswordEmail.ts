import jwt from 'jsonwebtoken'
import type { ReadOne } from '../../common/types'
import { DB_ENTITIES, JWT_SECRET } from '../../common/constants'
import { sendEmail } from '../../email/sendEmail'

export const sendRecoverPasswordEmail = async(email: string, readOne: ReadOne): Promise<string> => {
  try {
    const userDB = await readOne(DB_ENTITIES.USERS.name, { email })
    const token = jwt.sign({ _id: userDB._id.toString(), name: userDB.name, email: userDB.email }, JWT_SECRET)
    await sendEmail(email, token)
    return 'Email sent correctly'
  } catch (error) {
    console.log('Error sending email:', error)
    return 'Error occurred'
  }
}
