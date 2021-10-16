import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/DbTypes'
import { authRequired } from '../validation/authRequired'
import { createFlight } from './action/createFlight'
import { getFlightById } from './action/getFlightById'
import { updateFlightById } from './action/updateFlightById'
import { AppContext } from '../common/types'
import { deleteFlight } from './action/deleteFlight'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne, deleteOne } = crudAdapter

  const useFlightResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'getFlightById':
        return await authRequired(
          context.me,
          getFlightById,
          args.flightId,
          context.me?.id,
          readOne
        )
      case 'deleteFlight':
        return await authRequired(
          context.me,
          deleteFlight,
          args.flightId,
          context.me?.id,
          deleteOne
        )
      case 'createFlight':
        return await authRequired(
          context.me,
          createFlight,
          args.newFlight,
          context.me?.id,
          createOne
        )
      case 'updateFlightById':
        return await authRequired(
          context.me,
          updateFlightById,
          args.flightId,
          context.me?.id,
          args.updatedFlight,
          updateOne
        )
    }
  }

  return {
    Query: {
      getFlightById: useFlightResolvers,
    },
    Mutation: {
      createFlight: useFlightResolvers,
      deleteFlight: useFlightResolvers,
      updateFlightById: useFlightResolvers,
    },
  }
}
