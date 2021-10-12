import { gql } from 'apollo-server-express'
import { SalaryTableType } from '../salaryTable/SalaryTableType'
import { ScheduleType } from '../schedule/ScheduleType'

export type UserType = {
  _id: string
  name: string
  email: string
  company?: string
  salaryTable?: SalaryTableType
  schedule?: ScheduleType[]
}

export const UserTypeDefs = gql`
  type Query {
    # Returns the token
    authUser(email: String, password: String): String
    askRecoverPassword(email: String): String
  }
  
  type Mutation {
    createUser(newUser: UserInput, password: String): User
    updatePassword(oldPassword: String, newPassword: String): User
  }
  
  type User {
    _id: ID!
    name: String!
    email: String!
    company: String
    salaryTable: SalaryTable
    schedule: [Schedule]
  }
  
  input UserInput {
    name: String!
    email: String!
    company: String
  }
  
`
