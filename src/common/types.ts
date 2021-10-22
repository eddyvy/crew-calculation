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
  EVENTS: EntityPropsType
  USERS: EntityPropsType
}

export type AppContext = Context<{ me: MeType | null }>

export type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
