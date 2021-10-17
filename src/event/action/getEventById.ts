import type { ReadOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'
import type { EventType } from '../EventType'

export  const getEventById = async(
  eventId: string,
  ownerId: string,
  readOne: ReadOne
): Promise<EventType | null> => {
  return await readOne(DB_ENTITIES.EVENTS.name, { id: eventId, ownerId: ownerId }) as EventType
}
