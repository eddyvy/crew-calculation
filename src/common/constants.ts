import { config } from 'dotenv'

config()

const DB_ENTITIES = {
  FLIGHTS: 'flights',
  SALARY_TABLES: 'salaryTables',
  SCHEDULES: 'schedules',
  USERS: 'users',
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
