import { gql } from 'apollo-server-express'
import { FlightType } from '../flight/FlightType'

export type ScheduleType = {
  id: number
  month: number
  flights: FlightType[]
  standby: Date[]
  reserve: Date[]
  calculation: number
}

export const ScheduleTypeDefs = gql`
  type Query {
    schedule: Schedule
  }
  
  type Schedule {
    id: ID!
    month: Int!
    flights: [Flight]!
    standby: [Int]!
    reserve: [Int]!
    calculation: Float
  }
`
