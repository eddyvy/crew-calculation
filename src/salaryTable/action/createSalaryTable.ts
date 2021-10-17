import { SalaryTableInput, SalaryTableType } from '../SalaryTableType'
import { CreateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export const createSalaryTable = async(
  salaryTableInput: SalaryTableInput,
  ownerId: string,
  createOne: CreateOne
): Promise<SalaryTableType | null> => {
  return await createOne(DB_ENTITIES.SALARY_TABLES.name, { ...salaryTableInput, ownerId }) as SalaryTableType
}
