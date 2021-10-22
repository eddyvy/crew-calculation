import type { ReadBetweenValues } from '../../database/SpecificCrudAdapterType'
import { DB_ENTITIES } from '../../common/constants'
import type { EventType } from '../EventType'

export const getEventsByDateTimeInterval = async(
  startTime: Date,
  endTime: Date,
  ownerId: string,
  readBetweenValues: ReadBetweenValues
): Promise<EventType[]> => {
  const takeOffFilter = { field: 'eventStart', min: startTime.valueOf(), max: endTime.valueOf() }
  const landingFilter = { field: 'eventFinish', min: startTime.valueOf(), max: endTime.valueOf() }

  return await readBetweenValues(DB_ENTITIES.EVENTS.name, { ownerId }, takeOffFilter, landingFilter) as EventType[]
}
