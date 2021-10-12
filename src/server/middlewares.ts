import express, { Express } from 'express'
import cors from 'cors'

export const expressMiddlewares = (app: Express): void => {
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}
