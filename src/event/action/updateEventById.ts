import type { EventInput, EventType } from '../EventType'
import type { UpdateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export const updateEventById = async(
  eventId: string,
  ownerId: string,
  eventInput: EventInput,
  updateOne: UpdateOne
): Promise<EventType | null> => {
  return await updateOne(DB_ENTITIES.EVENTS.name, { id: eventId, ownerId }, { ...eventInput }) as EventType
}
