import { config } from 'dotenv'
import { AppEntities } from './types'
import path from 'path'

const checkEnv = (envConst: (string | undefined)): string => {
  if (!envConst) throw new Error('Error in env constants validation')
  return envConst
}

config()

export const STATICS_PATH = path.join(checkEnv(process.env.INIT_CWD), checkEnv(process.env.PUBLIC_PATH))
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
    uniqueKey: 'ownerId',
  },
  EVENTS: {
    name: 'events',
    uniqueKey: null,
  },
  USERS: {
    name: 'users',
    uniqueKey: 'email',
  },
}
