import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../common/types'
import { createFlight } from './actions/createFlight'
import { getFlightById } from './actions/getFlightById'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne } = crudAdapter

  const useFlightResolvers = async(parent: any, args: any, context: any, info: any) => {
    switch (info.fieldName) {
      case 'getFlightById':
        return (context.me)
          ? getFlightById(args.flightId, context.me._id, readOne)
          : null
      case 'createFlight':
        return (context.me)
          ? createFlight(args.newFlight, context.me._id, createOne)
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
