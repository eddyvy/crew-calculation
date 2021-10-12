import { Express } from 'express'
import routes from './routes'
import { recoverPasswordController } from '../user/controller/recoverPasswordController'

export const expressRouter = (app: Express): void => {
  app.get(routes.recoverPasswordWithToken, recoverPasswordController)
}
