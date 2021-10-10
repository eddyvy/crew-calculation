import type { Db } from 'mongodb'
import type { EntityType } from '../common/types'

export const createCollectionsIndexes = async(db: Db, DB_ENTITIES: Record<string, EntityType>): Promise<void> => {
  Object.values(DB_ENTITIES).forEach(({ name, uniqueKey }) => {
    if (uniqueKey) {
      const uniqueOption: Record<string, number> = {}
      uniqueOption[`${uniqueKey}`] = 2
      db.collection(name).createIndex(uniqueOption, { unique: true })
    }
  })
}
