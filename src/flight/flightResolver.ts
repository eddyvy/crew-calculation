import { FlightType } from './FlightType'
import { CrudAdapter } from '../common/types'
import { IResolvers } from '@graphql-tools/utils/Interfaces'
import { createFlight } from './actions/createFlight'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne } = crudAdapter

  const getFlightById = (flightId: string, ownerId: string): FlightType => ({
    _id: 'hashForId1',
    ownerId: ownerId,
    takeOff: new Date(2021, 1, 1, 12),
    landing: new Date(2021, 1, 1, 13),
    departure: {
      code: 'MAD',
      isBase: true,
      isNational: true,
    },
    destination: {
      code: 'PUJ',
      isBase: false,
      isNational: false,
    },
  })

  const useFlightResolvers = async(parent: any, args: any, context: any, info: any) => {
    switch (info.fieldName) {
      case 'getFlightById':
        return (context.me)
          ? getFlightById(args.flightId, context.me._id)
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
