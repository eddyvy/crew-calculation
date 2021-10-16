import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/DbTypes'
import { createFlight } from './action/createFlight'
import { getFlightById } from './action/getFlightById'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne } = crudAdapter

  const useFlightResolvers = async(parent: any, args: any, context: any, info: any) => {
    switch (info.fieldName) {
      case 'getFlightById':
        return (context.me)
          ? getFlightById(args.flightId, context.me.id, readOne)
          : null
      case 'createFlight':
        return (context.me)
          ? createFlight(args.newFlight, context.me.id, createOne)
          : null
    }
  }

  return {
    Query: {
      getFlightById: useFlightResolvers,
    },
    Mutation: {
      createFlight: useFlightResolvers,
    },
  }
}
