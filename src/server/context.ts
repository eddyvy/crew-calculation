import type { Request } from 'express'
import type { Context } from 'apollo-server-core'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../common/constants'
import { MeType } from '../common/types'

export const expressContext = (context: Context<{ req: Request }>): Context<{ me: MeType | null }> => {
  const { req } = context
  if (req.headers.authorization) {
    const token = req.headers.authorization.split('Bearer ')[1] || null
    const me = token ? jwt.verify(token, JWT_SECRET) as MeType : null
    return { me }
  }
  return { me: null }
}
