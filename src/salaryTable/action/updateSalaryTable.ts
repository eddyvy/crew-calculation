import { SalaryTableInput, SalaryTableType } from '../SalaryTableType'
import { UpdateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export const updateSalaryTable = async(
  salaryTableInput: SalaryTableInput,
  ownerId: string,
  updateOne: UpdateOne
): Promise<SalaryTableType | null> => {
  return await updateOne(DB_ENTITIES.SALARY_TABLES.name, { ownerId }, salaryTableInput) as SalaryTableType
}
