import type { MongoClient } from 'mongodb'
import type { EntityPropsType } from '../database/DbTypes'
import { createCollectionsIndexes } from './createCollectionsIndexes'

export const startMongodbClient = async(
  client: MongoClient,
  DB_NAME: string,
  DB_ENTITIES: Record<string, EntityPropsType>
): Promise<MongoClient> => {
  try {
    await client.connect()
    await createCollectionsIndexes(client.db(DB_NAME), DB_ENTITIES)
    console.log('Connected successfully to db')
    return client
  } catch (error) {
    throw new Error(`Error connecting db: ${error}`)
  }
}
