import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { createSalaryTable } from './action/createSalaryTable'

export const salaryTableResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne } = crudAdapter

  const useSalaryTableResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'createSalaryTable':
        return await authRequired(
          context.me,
          createSalaryTable,
          args.newSalaryTable,
          context.me?.id,
          createOne
        )
    }
  }

  return {
    Mutation: {
      createSalaryTable: useSalaryTableResolvers,
    },
  }
}
