import { Express } from 'express'
import routes from './routes'
import { STATICS_PATH } from '../common/constants'
import { recoverPasswordController } from '../user/controller/recoverPasswordController'

export const expressRouter = (app: Express): void => {
  app.get(routes.recoverPasswordWithToken, recoverPasswordController)
  app.get(routes.home, (req, res) => {
    res.sendFile(STATICS_PATH + '/index.html')
  })
}
