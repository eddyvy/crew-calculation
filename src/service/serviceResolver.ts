import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import type { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { getSalaryCalculation } from './action/getSalaryCalculation'

export const serviceResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const useServiceResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'getSalaryCalculation':
        return await authRequired(
          context.me,
          getSalaryCalculation,
          args.startDate,
          args.endDate,
          context.me?.id,
          crudAdapter
        )
    }
  }

  return {
    Query: {
      getSalaryCalculation: useServiceResolvers,
    },
  }
}
