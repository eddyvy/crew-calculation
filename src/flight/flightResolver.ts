import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import type { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { createFlight } from './action/createFlight'
import { getFlightById } from './action/getFlightById'
import { updateFlightById } from './action/updateFlightById'
import { deleteFlightById } from './action/deleteFlightById'
import { getFlightsByDateTimeInterval } from './action/getFlightsByDateTimeInterval'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne, deleteOne, readBetweenValues } = crudAdapter

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
      case 'deleteFlightById':
        return await authRequired(
          context.me,
          deleteFlightById,
          args.flightId,
          context.me?.id,
          deleteOne
        )
      case 'createFlight':
        return await authRequired(
          context.me,
          createFlight,
          args.flightInput,
          context.me?.id,
          createOne
        )
      case 'updateFlightById':
        return await authRequired(
          context.me,
          updateFlightById,
          args.flightId,
          context.me?.id,
          args.flightInput,
          updateOne
        )
      case 'getFlightsByDateTimeInterval':
        return await authRequired(
          context.me,
          getFlightsByDateTimeInterval,
          args.startTime,
          args.endTime,
          context.me?.id,
          readBetweenValues
        )
    }
  }

  return {
    Query: {
      getFlightById: useFlightResolvers,
      getFlightsByDateTimeInterval: useFlightResolvers,
    },
    Mutation: {
      createFlight: useFlightResolvers,
      deleteFlightById: useFlightResolvers,
      updateFlightById: useFlightResolvers,
    },
  }
}
