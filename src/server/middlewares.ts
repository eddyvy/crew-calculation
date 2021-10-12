import express, { Express } from 'express'

export const expressMiddlewares = (app: Express): void => {
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
}
