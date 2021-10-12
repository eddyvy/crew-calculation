import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../../common/constants'

export const recoverPasswordController = async(req: Request, res: Response): Promise<void> => {
  try {
    const payload = await jwt.verify(req.params.token, JWT_SECRET)
    res.send({ msg: 'Here will go your html to recover', payload })
  } catch (error) {
    console.log('Error in password recovery: ', error)
    res.status(400).send({ msg: 'Error with password recovery' })
  }
}
