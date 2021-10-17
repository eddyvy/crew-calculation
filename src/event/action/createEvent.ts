import type { CreateOne } from '../../database/CrudAdapaterType'
import { DB_ENTITIES } from '../../common/constants'
import type { EventInput, EventType } from '../EventType'

export const createEvent = async(
  eventInput: EventInput,
  ownerId: string,
  createOne: CreateOne
): Promise<EventType | null> => {
  return await createOne(DB_ENTITIES.EVENTS.name, { ...eventInput, ownerId }) as EventType
}
