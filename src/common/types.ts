import { Context } from 'apollo-server-core'

export type MeType = {
  id: string
  name: string
  email: string
}

export type EntityPropsType = {
  name: string
  uniqueKey: string | null
}

export type AppEntities = {
  FLIGHTS: EntityPropsType
  SALARY_TABLES: EntityPropsType
  SCHEDULES: EntityPropsType
  USERS: EntityPropsType
}

export type AppContext = Context<{ me: MeType | null }>
