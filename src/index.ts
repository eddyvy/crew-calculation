import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { MongoClient } from 'mongodb'
import { DB_ENTITIES, DB_NAME, DB_URI, PORT } from './common/constants'
import { schema } from './server/schema'
import { startMongodbClient } from './mongodb/startMongodbClient'
import { mongodbAdapter } from './mongodb/mongodbAdapter'
import { expressMiddlewares } from './server/middlewares'
import { expressRouter } from './server/router'
import { expressContext } from './server/context'

const run = async() => {
  const mongoClient = await startMongodbClient(new MongoClient(DB_URI), DB_NAME, DB_ENTITIES)
  const crudAdapter = mongodbAdapter(mongoClient, DB_NAME)

  const app = express()
  const httpServer = http.createServer(app)

  expressMiddlewares(app)
  expressRouter(app)

  const server = new ApolloServer({
    schema: schema(crudAdapter),
    context: expressContext,
    plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
  })

  await server.start()
  server.applyMiddleware({ app })
  httpServer.listen({ port: PORT })

  return `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
}

run()
  .then(console.log)
  .catch((error) => console.error('Error starting the server:', error))
