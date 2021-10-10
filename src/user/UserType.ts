import { gql } from 'apollo-server-express'
import { SalaryTableType } from '../salaryTable/SalaryTableType'
import { ScheduleType } from '../schedule/ScheduleType'

export type UserType = {
  id: number
  name: string
  email: string
  company?: string
  salaryTable?: SalaryTableType
  schedule?: ScheduleType[]
}

export const UserTypeDefs = gql`
  type Query {
    user: User
  }
  
  type Mutation {
    createUser(newUser: UserInput, password: String): User
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    company: String
    salaryTable: SalaryTable
    schedule: [Schedule]
  }
  
  input UserInput {
    id: ID!
    name: String!
    email: String!
    company: String
  }
  
`
