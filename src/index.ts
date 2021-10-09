import http from 'http'
import express from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { MongoClient } from 'mongodb'
import getConstants from './common/getConstants'
import { startMongodbClient } from './mongodb/startMongodbClient'

const run = async() => {
  const {
    PORT,
    DB_URI,
    DB_NAME,
    dbNames,
  } = getConstants()
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

  await startMongodbClient(new MongoClient(DB_URI), DB_NAME, dbNames)

  await server.start()
  server.applyMiddleware({ app })
  httpServer.listen({ port: PORT })

  return `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
}

run()
  .then(console.log)
  .catch((error) => console.error('Error starting the server:', error))
