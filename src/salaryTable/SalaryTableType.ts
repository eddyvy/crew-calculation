import { gql } from 'apollo-server-express'

export type SalaryTableType = {
  id: number
  base: number  // monthly
  extraFlightTimeThreshold: number
  extraFlightTimeAmount: number // hourly
  standby: number // daily
  office: number  // daily
  freeDayLost: number // daily
  trainingHour: number  // hourly
  trainingHourCRM: number // hourly
  plusSCC: number // flight
  plusSpecialFlight: number // flight
  plusBackBase: number  // flight
  dietNational: number  // daily
  dietInternational: number // daily
  dietNationalNoSleep: number // daily
  dietInternationalNoSleep: number  //daily
}

export const SalaryTableTypeDefs = gql`
  type Query {
    salaryTable: SalaryTable
  }
  
  type SalaryTable {
    id: ID!
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
