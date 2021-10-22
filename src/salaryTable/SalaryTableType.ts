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

export type SalaryCalculation = {
  base: number
  totalFT: number
  totalSB: number
  totalOffice: number
  totalFreeLost: number
  totalTH: number
  totalTHCrm: number
  totalSCC: number
  totalSpF: number
  totalPlusBB: number
  totalNatD: number
  totalIntD: number
  totalNatNSD: number
  totalIntNSD: number
  total: number
}

export const SalaryTableTypeDefs = gql`
  type Query {
    getSalaryTable: SalaryTable
  }
    
  type Mutation {
    createSalaryTable(salaryTableInput: SalaryTableInput): SalaryTable
    updateSalaryTable(salaryTableInput: SalaryTableInput): SalaryTable
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
  
  type SalaryCalculation {
    base: Float
    totalFT: Float
    totalSB: Float
    totalOffice: Float
    totalFreeLost: Float
    totalTH: Float
    totalTHCrm: Float
    totalSCC: Float
    totalSpF: Float
    totalPlusBB: Float
    totalNatD: Float
    totalIntD: Float
    totalNatNSD: Float
    totalIntNSD: Float
    total: Float
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
