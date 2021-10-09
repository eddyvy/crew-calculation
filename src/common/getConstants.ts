import { config } from 'dotenv'

type appConstants = {
  PORT: string
  DB_URI: string
  DB_NAME: string
  dbNames: string[]
}

const getConstants = (): appConstants => {
  config()

  const dbNames = [
    'flights',
    'salaryTables',
    'schedules',
    'users',
  ]

  const checkEnv = (envConst: (string | undefined)): string => {
    if (!envConst) throw new Error('Env constants error')
    return envConst
  }

  return {
    PORT: checkEnv(process.env.PORT),
    DB_URI: checkEnv(process.env.DB_URI),
    DB_NAME: checkEnv(process.env.DB_NAME),
    dbNames,
  }
}

export default getConstants
