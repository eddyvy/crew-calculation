import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { createSalaryTable } from './action/createSalaryTable'
import { getSalaryTable } from './action/getSalaryTable'
import { updateSalaryTable } from './action/updateSalaryTable'

export const salaryTableResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne } = crudAdapter

  const useSalaryTableResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'createSalaryTable':
        return await authRequired(
          context.me,
          createSalaryTable,
          args.salaryTableInput,
          context.me?.id,
          createOne
        )
      case 'getSalaryTable':
        return await authRequired(
          context.me,
          getSalaryTable,
          context.me?.id,
          readOne
        )
      case 'updateSalaryTable':
        return await authRequired(
          context.me,
          updateSalaryTable,
          context.me?.id,
          args.salaryTableInput,
          updateOne
        )
    }
  }

  return {
    Query: {
      getSalaryTable: useSalaryTableResolvers,
    },
    Mutation: {
      createSalaryTable: useSalaryTableResolvers,
      updateSalaryTable: useSalaryTableResolvers,
    },
  }
}
