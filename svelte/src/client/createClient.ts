import { GraphQLClient } from 'graphql-request'

export const createClient = () => new GraphQLClient('http://localhost:4000/graphql')
