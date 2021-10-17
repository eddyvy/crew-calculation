import { gql } from 'apollo-server-express'

export type SalaryTableType = {
  id: string
  ownerId: string
  base: number  // monthly
  extraFlightTimeThreshold: number
  extraFlightTimeAmount: number // hourly
  standby: number // daily
  office?: number  // daily
  freeDayLost?: number // daily
  trainingHour?: number  // hourly
  trainingHourCRM?: number // hourly
  plusSCC?: number // flight
  plusSpecialFlight?: number // flight
  plusBackBase?: number  // flight
  dietNational?: number  // daily
  dietInternational?: number // daily
  dietNationalNoSleep?: number // daily
  dietInternationalNoSleep?: number  //daily
}

export type SalaryTableInput = {
  base: number
  extraFlightTimeThreshold: number
  extraFlightTimeAmount: number
  standby: number
  office?: number
  freeDayLost?: number
  trainingHour?: number
  trainingHourCRM?: number
  plusSCC?: number
  plusSpecialFlight?: number
  plusBackBase?: number
  dietNational?: number
  dietInternational?: number
  dietNationalNoSleep?: number
  dietInternationalNoSleep?: number
}

export const SalaryTableTypeDefs = gql`
    
  type Mutation {
    createSalaryTable(newSalaryTable: SalaryTableInput): SalaryTable
  }
  
  type SalaryTable {
    id: ID!
    ownerId: ID!
    base: Float!
    extraFlightTimeThreshold: Int!
    extraFlightTimeAmount: Float!
    standby: Float!
    office: Float
    freeDayLost: Float
    trainingHour: Float
    trainingHourCRM: Float
    plusSCC: Float
    plusSpecialFlight: Float
    plusBackBase: Float
    dietNational: Float
    dietInternational: Float
    dietNationalNoSleep: Float
    dietInternationalNoSleep: Float
  }
  
  input SalaryTableInput {
    base: Float!
    extraFlightTimeThreshold: Int!
    extraFlightTimeAmount: Float!
    standby: Float!
    office: Float
    freeDayLost: Float
    trainingHour: Float
    trainingHourCRM: Float
    plusSCC: Float
    plusSpecialFlight: Float
    plusBackBase: Float
    dietNational: Float
    dietInternational: Float
    dietNationalNoSleep: Float
    dietInternationalNoSleep: Float
  }
`
