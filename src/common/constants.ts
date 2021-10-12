import { config } from 'dotenv'
import type { EntityType } from './types'

config()

const checkEnv = (envConst: (string | undefined)): string => {
  if (!envConst) throw new Error('Env constants error')
  return envConst
}

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
    uniqueKey: null,
  },
}

export default {
  PORT: checkEnv(process.env.PORT),
  DB_URI: checkEnv(process.env.DB_URI),
  DB_NAME: checkEnv(process.env.DB_NAME),
  DB_ENTITIES,
  JWT_SECRET: checkEnv(process.env.JWT_SECRET),
  SALT_ROUNDS: 10,
}
