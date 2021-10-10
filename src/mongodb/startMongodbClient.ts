import type { MongoClient } from 'mongodb'

export const startMongodbClient = async(client: MongoClient): Promise<MongoClient> => {
  try {
    await client.connect()
    console.log('Connected successfully to db')
    return client
  } catch (error) {
    throw new Error(`Error connecting db: ${error}`)
  }
}
