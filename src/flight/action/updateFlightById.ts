import type { FlightInput, FlightType } from '../FlightType'
import type { UpdateOne } from '../../database/DbTypes'
import { DB_ENTITIES } from '../../common/constants'

export const updateFlightById = async(
  flightId: string,
  ownerId: string,
  flightInput: FlightInput,
  updateOne: UpdateOne
): Promise<FlightType | null> => {
  console.log(flightId, flightInput, ownerId)
  const resp = await updateOne(DB_ENTITIES.FLIGHTS.name, { id: flightId, ownerId }, { ...flightInput }) as FlightType
  console.log(resp)
  return resp
}
