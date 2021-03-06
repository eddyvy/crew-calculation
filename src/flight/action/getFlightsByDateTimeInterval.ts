import type { ReadBetweenValues } from '../../database/SpecificCrudAdapterType'
import { DB_ENTITIES } from '../../common/constants'
import type { FlightType } from '../FlightType'

export const getFlightsByDateTimeInterval = async(
  startTime: Date,
  endTime: Date,
  ownerId: string,
  readBetweenValues: ReadBetweenValues
): Promise<FlightType[]> => {
  const takeOffFilter = { field: 'takeOff', min: startTime.valueOf(), max: endTime.valueOf() }
  const landingFilter = { field: 'landing', min: startTime.valueOf(), max: endTime.valueOf() }

  return await readBetweenValues(DB_ENTITIES.FLIGHTS.name, { ownerId }, takeOffFilter, landingFilter) as FlightType[]
}
