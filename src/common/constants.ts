import { config } from 'dotenv'
import { AppEntities } from './types'

const checkEnv = (envConst: (string | undefined)): string => {
  if (!envConst) throw new Error('Env constants validation')
  return envConst
}

config()

export const PORT = checkEnv(process.env.PORT)
export const DB_URI = checkEnv(process.env.DB_URI)
export const DB_NAME = checkEnv(process.env.DB_NAME)
export const JWT_SECRET = checkEnv(process.env.JWT_SECRET)
export const SALT_ROUNDS = 10

export const DB_ENTITIES: AppEntities = {
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
    uniqueKey: 'email',
  },
}
