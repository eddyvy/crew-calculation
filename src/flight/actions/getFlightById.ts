import { FlightType } from '../FlightType'
import { ReadOne } from '../../common/types'
import { DB_ENTITIES } from '../../common/constants'

export  const getFlightById = async(
  flightId: string,
  ownerId: string,
  readOne: ReadOne
): Promise<FlightType | null> => {
  return await readOne(DB_ENTITIES.FLIGHTS.name, { ownerId: ownerId })
}
