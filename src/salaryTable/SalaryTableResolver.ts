import { SalaryTableType } from './SalaryTableType'

const getSalaryTable = (): SalaryTableType => ({
  id: 1,
  base: 1000,
  extraFlightTimeThreshold: 60,
  extraFlightTimeAmount: 15,
  standby: 30,
  office: 35,
  freeDayLost: 50,
  trainingHour: 40,
  trainingHourCRM: 41.5,
  plusSCC: 40,
  plusSpecialFlight: 40,
  plusBackBase: 650,
  dietNational: 40,
  dietInternational: 60,
  dietNationalNoSleep: 30,
  dietInternationalNoSleep: 50,
})

export const SalaryTableResolver = {
  Query: {
    salaryTable: getSalaryTable,
  },
}
