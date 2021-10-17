import { CrudAdapter } from '../../database/CrudAdapaterType'

export const getSalaryCalculation = async(
  startDate: Date,
  endDate: Date,
  ownerId: string,
  crudAdapter: CrudAdapter
): Promise<number | null> => {
  // ... logic to calculate de salary
  return 1000
}
