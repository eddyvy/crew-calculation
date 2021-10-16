import { FlightInput, FlightType } from '../FlightType'
import type { CreateOne } from '../../database/DbTypes'
import { DB_ENTITIES } from '../../common/constants'

export const createFlight = async(
  newFlight: FlightInput,
  ownerId: string,
  createOne: CreateOne
): Promise<FlightType | null> => {
  return await createOne(DB_ENTITIES.FLIGHTS.name, { ownerId, ...newFlight }) as FlightType
}
