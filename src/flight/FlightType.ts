import { gql } from 'apollo-server-express'

export type FlightType = {
  id: number
  takeOff: Date
  landing: Date
  departure: string
  destination: string
}

export const FlightTypeDefs = gql`
  type Query {
    flight: Flight
  }
  
  type Flight {
    id: ID!
    takeOff: Int!
    landing: Int!
    departure: String!
    destination: String!
  }
`
