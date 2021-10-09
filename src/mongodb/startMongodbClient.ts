import type { Collection, Db, Document, MongoClient } from 'mongodb'

export const startMongodbClient = async(
  client: MongoClient,
  DB_NAME: string,
  collections: string[]
): Promise<{ mongoDb: Db, mongoCollections: Collection<Document>[] }> => {
  const mongoDb = client.db(DB_NAME)
  const mongoCollections = collections.map( (col) => mongoDb.collection(col))
  try {
    await client.connect()
    console.log('Connected successfully to db')
    return { mongoDb, mongoCollections }
  } catch (error) {
    throw new Error(`Error connecting db: ${error}`)
  }
}
