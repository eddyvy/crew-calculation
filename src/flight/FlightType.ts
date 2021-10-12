import { gql } from 'apollo-server-express'

export type Airport = {
  code: string,
  isBase: boolean,
  isNational: boolean,
}

export type FlightType = {
  _id: string
  ownerId: string
  takeOff: Date
  landing: Date
  departure: Airport
  destination: Airport
}

export const FlightTypeDefs = gql`
  type Query {
    getFlightById(flightId: String): Flight
  }
  
  type Flight {
    _id: ID!
    ownerId: ID!
    takeOff: Float!
    landing: Float!
    departure: Airport!
    destination: Airport!
  }
  
  type Airport {
    code: String!
    isBase: Boolean!
    isNational: Boolean!
  }
`
