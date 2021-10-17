import type { ReadOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'
import { SalaryTableType } from '../SalaryTableType'

export const getSalaryTable = async(ownerId: string, readOne: ReadOne): Promise<SalaryTableType | null> => {
  return await readOne(DB_ENTITIES.SALARY_TABLES.name, { ownerId }) as SalaryTableType
}
