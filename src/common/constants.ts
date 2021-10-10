import { config } from 'dotenv'
import type { EntityType } from './types'

config()

const DB_ENTITIES: Record<string, EntityType> = {
  FLIGHTS: {
    name: 'flights',
    uniqueKey: null,
  },
  SALARY_TABLES: {
    name: 'salaryTables',
    uniqueKey: null,
  },
  SCHEDULES: {
    name: 'schedules',
    uniqueKey: null,
  },
  USERS: {
    name: 'users',
    uniqueKey:'email',
  },
}

const checkEnv = (envConst: (string | undefined)): string => {
  if (!envConst) throw new Error('Env constants error')
  return envConst
}

export default {
  PORT: checkEnv(process.env.PORT),
  DB_URI: checkEnv(process.env.DB_URI),
  DB_NAME: checkEnv(process.env.DB_NAME),
  DB_ENTITIES,
}
