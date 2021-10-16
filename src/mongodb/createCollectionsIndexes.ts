import type { Db } from 'mongodb'
import { AppEntities } from '../common/types'

export const createCollectionsIndexes = async(db: Db, DB_ENTITIES: AppEntities): Promise<void> => {
  Object.values(DB_ENTITIES).forEach(({ name, uniqueKey }) => {
    if (uniqueKey) {
      const uniqueOption: Record<string, number> = {}
      uniqueOption[`${uniqueKey}`] = 2
      db.collection(name).createIndex(uniqueOption, { unique: true })
    }
  })
}
