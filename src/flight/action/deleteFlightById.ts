import { FlightType } from '../FlightType'
import type { DeleteOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export  const deleteFlightById = async(
  flightId: string,
  ownerId: string,
  deleteOne: DeleteOne
): Promise<FlightType | null> => {
  return await deleteOne(DB_ENTITIES.FLIGHTS.name, { id: flightId, ownerId: ownerId }) as FlightType
}
