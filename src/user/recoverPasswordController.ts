import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import CONSTANTS from '../common/constants'

export const recoverPasswordController = async(req: Request, res: Response): Promise<void> => {
  try {
    const { JWT_SECRET } = CONSTANTS
    const payload = await jwt.verify(req.params.token, JWT_SECRET)
    res.send({ msg: 'Here will go your html to recover', payload })
  } catch (error) {
    console.log('Error in password recovery: ', error)
    res.status(400).send({ msg: 'Error with password recovery' })
  }
}
