import { FlightType } from './FlightType'
import { CrudAdapter } from '../common/types'
import { IResolvers } from '@graphql-tools/utils/Interfaces'

export const flightResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const getFlightById = (flightId: string, userId: string): FlightType => ({
    _id: 'hashForId1',
    ownerId: userId,
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
          ? await getFlightById(args.flightId, context.me._id)
          : null
    }
  }

  return {
    Query: {
      getFlightById: useFlightResolvers,
    },
  }
}
