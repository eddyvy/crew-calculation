import type { FlightInput, FlightType } from '../FlightType'
import type { UpdateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export const updateFlightById = async(
  flightId: string,
  ownerId: string,
  flightInput: FlightInput,
  updateOne: UpdateOne
): Promise<FlightType | null> => {
  return await updateOne(DB_ENTITIES.FLIGHTS.name, { id: flightId, ownerId }, { ...flightInput }) as FlightType
}
