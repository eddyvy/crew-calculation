import { gql } from 'apollo-server-express'

export type Airport = {
  id: number,
  code: string,
  isBase: boolean,
  isNational: boolean,
}

export type FlightType = {
  id: number
  takeOff: Date
  landing: Date
  departure: Airport
  destination: Airport
}

export const FlightTypeDefs = gql`
  type Query {
    flight: Flight
  }
  
  type Flight {
    id: ID!
    takeOff: Float!
    landing: Float!
    departure: Airport!
    destination: Airport!
  }
  
  type Airport {
      id: ID!
      code: String!
      isBase: Boolean!
      isNational: Boolean!
  }
`
