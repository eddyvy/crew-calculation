import { FlightType } from '../FlightType'
import type { ReadOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export  const getFlightById = async(
  flightId: string,
  ownerId: string,
  readOne: ReadOne
): Promise<FlightType | null> => {
  return await readOne(DB_ENTITIES.FLIGHTS.name, { id: flightId, ownerId: ownerId }) as FlightType
}
