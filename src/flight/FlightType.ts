import { gql } from 'apollo-server-express'

export type Airport = {
  code: string
  isBase: boolean
  isNational: boolean
}

export type Role = 'CC' | 'SCC' | 'FO' | 'CPT' | 'PAX'  | 'BackBase' | 'Special' | 'Ground'

export type FlightType = {
  id: string
  ownerId: string
  takeOff: Date
  landing: Date
  departure: Airport
  destination: Airport
  role: Role
}

export type FlightInput = {
  takeOff: Date
  landing: Date
  departure: Airport
  destination: Airport
  role: Role
}

export const FlightTypeDefs = gql`
  type Query {
    getFlightById(flightId: ID): Flight
    getFlightsByDateTimeInterval(startTime: Float, endTime: Float): [Flight]
  }

  type Mutation {
    createFlight(flightInput: FlightInput): Flight
    deleteFlightById(flightId: ID): Flight
    updateFlightById(flightId: ID, flightInput: FlightInput): Flight
  }

  type Flight {
    id: ID!
    ownerId: ID!
    takeOff: Float!
    landing: Float!
    departure: Airport!
    destination: Airport!
    role: Role!
  }

  type Airport {
    code: String!
    isBase: Boolean!
    isNational: Boolean!
  }
  
  enum Role {
    CC
    SCC
    FO
    CPT
    PAX
    BackBase
    Special
    Ground # Transport by ground
  }

  input FlightInput {
    takeOff: Float!
    landing: Float!
    departure: AirportInput!
    destination: AirportInput!
    role: Role!
  }

  input AirportInput {
    code: String!
    isBase: Boolean!
    isNational: Boolean!
  }
`
