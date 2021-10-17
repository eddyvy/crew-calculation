import { EventType } from '../EventType'
import type { DeleteOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'

export  const deleteEventById = async(
  eventId: string,
  ownerId: string,
  deleteOne: DeleteOne
): Promise<EventType | null> => {
  return await deleteOne(DB_ENTITIES.EVENTS.name, { id: eventId, ownerId: ownerId }) as EventType
}
