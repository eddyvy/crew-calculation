import { FlightInput, FlightType } from '../FlightType'
import type { CreateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export const createFlight = async(
  flightInput: FlightInput,
  ownerId: string,
  createOne: CreateOne
): Promise<FlightType | null> => {
  return await createOne(DB_ENTITIES.FLIGHTS.name, { ownerId, ...flightInput }) as FlightType
}
