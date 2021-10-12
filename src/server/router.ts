import { Express } from 'express'
import ROUTES from './routes'
import { recoverPasswordController } from '../user/recoverPasswordController'

export const expressRouter = (app: Express): void => {
  app.get(ROUTES.recoverPasswordWithToken, recoverPasswordController)
}
