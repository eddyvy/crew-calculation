import { gql } from 'apollo-server-express'

export const ServiceTypeDefs = gql`
  type Query {
      getSalaryCalculation(startDate: Float, endDate: Float): Float
  }
`
