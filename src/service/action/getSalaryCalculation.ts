import type { Month } from '../../common/types'
import type { CrudAdapter } from '../../database/CrudAdapaterType'
import type{ SalaryCalculation } from '../../salaryTable/SalaryTableType'
import { getSalaryTable } from '../../salaryTable/action/getSalaryTable'
import { getFlightsByDateTimeInterval } from '../../flight/action/getFlightsByDateTimeInterval'
import { getEventsByDateTimeInterval } from '../../event/action/getEventsByDateTimeInterval'
import { calculateSalary } from '../../logic/calculateSalary'

export const getSalaryCalculation = async(
  month: Month,
  year: number,
  ownerId: string,
  crudAdapter: CrudAdapter
): Promise<SalaryCalculation | null> => {
  const salaryTable = await getSalaryTable(ownerId, crudAdapter.readOne)

  if (!salaryTable) return null

  const startMonthTime = new Date(year, month - 1)
  const endMonthTime = new Date(year, month)

  const flights = await getFlightsByDateTimeInterval(startMonthTime, endMonthTime, ownerId, crudAdapter.readBetweenValues)
  const events = await getEventsByDateTimeInterval(startMonthTime, endMonthTime, ownerId, crudAdapter.readBetweenValues)

  return calculateSalary(salaryTable, flights, events, startMonthTime, endMonthTime)
}
