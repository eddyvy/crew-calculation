import { gql } from 'apollo-server-express'

export const ServiceTypeDefs = gql`
  type Query {
    # Month as integer (1 to 12)
    getSalaryCalculation(month: Int, year: Int): SalaryCalculation
  }
`
