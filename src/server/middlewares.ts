import express, { Express } from 'express'
import cors from 'cors'
import { STATICS_PATH } from '../common/constants'

export const expressMiddlewares = (app: Express): void => {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(express.static(STATICS_PATH))
}
