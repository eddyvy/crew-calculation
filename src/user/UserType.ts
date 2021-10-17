import { gql } from 'apollo-server-express'
import { SalaryTableType } from '../salaryTable/SalaryTableType'
import { ScheduleType } from '../schedule/ScheduleType'

export type UserType = {
  id: string
  name: string
  email: string
  company?: string
  salaryTable?: SalaryTableType
  schedule?: ScheduleType[]
}

export type UserInputType = {
  name: string
  email: string
  company?: string
}

export const UserTypeDefs = gql`
  type Query {
    # Returns the token
    authUser(email: String, password: String): String
    sendRecoverPasswordEmail(email: String): String
  }
  
  type Mutation {
    createUser(userInput: UserInput, password: String): User
    updatePassword(oldPassword: String, newPassword: String): User
    updateUser(userInput: UserInput): UpdatedUser
  }
  
  type User {
    id: ID!
    name: String!
    email: String!
    company: String
    salaryTable: SalaryTable
    schedule: [Schedule]
  }
  
  type UpdatedUser {
    updatedUser: User
    updatedToken: String
  }
  
  input UserInput {
    name: String!
    email: String!
    company: String
  }
`
