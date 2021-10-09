import http from 'http'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { config } from 'dotenv'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { startMongodbClient } from './mongodb/startMongodbClient'
import { MongoClient } from 'mongodb'

const run = async() => {
  const PORT = process.env.PORT
  const app = express()
  const httpServer = http.createServer(app)
  const typeDefs1 = gql`
      type Query {
          hello: String
      }
  `
  const typeDefs2 = gql`
      type Query {
          goodbye: String
      }
  `
  const typeDefs = mergeTypeDefs([
    typeDefs1,
    typeDefs2,
  ])
  const resolver1 = {
    Query: {
      hello: () => 'Hello world!',
    },
  }
  const resolver2 = {
    Query: {
      goodbye: () => 'GoodBye world!',
    },
  }
  const resolvers = mergeResolvers([
    resolver1,
    resolver2,
  ])
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ ApolloServerPluginDrainHttpServer({ httpServer }) ],
  })

  await startMongodbClient(
    new MongoClient(process.env.DB_URI!),
    process.env.DB_NAME!,
    [ 'users' ]
  )

  await server.start()
  server.applyMiddleware({ app })
  httpServer.listen({ port: PORT })

  return `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
}

config()
run()
  .then(console.log)
  .catch((error) => console.log('Error starting the server:', error))
