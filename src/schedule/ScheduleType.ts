import { FlightType } from '../flight/FlightType'
import { gql } from 'apollo-server-express'

export type ScheduleType = {
  id: number
  month: number
  flights: FlightType[]
  standby: Date[]
  reserve: Date[]
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
  }
`
