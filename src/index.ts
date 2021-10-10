import http from 'http'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { MongoClient } from 'mongodb'
import CONSTANTS from './common/constants'
import { schema } from './common/schema'
import { startMongodbClient } from './mongodb/startMongodbClient'
import { mongodbAdapter } from './mongodb/mongodbAdapter'

const run = async() => {
  const { PORT,  DB_URI,  DB_NAME, DB_ENTITIES } = CONSTANTS
  const mongoClient = await startMongodbClient(new MongoClient(DB_URI), DB_NAME, DB_ENTITIES)
  const crudAdapter = mongodbAdapter(mongoClient, DB_NAME)

  const app = express()
  const httpServer = http.createServer(app)

  const server = new ApolloServer({
    schema: schema(crudAdapter),
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
