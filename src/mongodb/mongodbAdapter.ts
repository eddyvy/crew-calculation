import { Document, MongoClient, ObjectId } from 'mongodb'
import type { CrudAdapter, DbEntity, DbInput, DbQuery } from '../database/DbTypes'

export const mongodbAdapter = (client: MongoClient, DB_NAME: string): CrudAdapter => {

  const db = client.db(DB_NAME)

  const mapQueryIdToMongodb = (query: DbQuery & { id?: string }): (DbQuery & { _id: ObjectId }) | DbQuery => {
    if (Object.keys(query).includes('id')) {
      const { id, ...queryWithoutId } = query
      return { ...queryWithoutId, _id: new ObjectId(id) } as DbQuery & { _id: ObjectId }
    }
    return query as DbQuery
  }

  const mapEntityIdFromMongodb = (entity: Document): DbEntity => {
    const { _id, ...entityWithoutId } = entity
    return { ...entityWithoutId, id: _id.toString() } as DbEntity
  }

  const createOne = async(entityName: string, input: DbInput): Promise<DbEntity | null> => {
    try {
      const { insertedId } = await db.collection(entityName).insertOne(input)
      return (insertedId) ? { ...input, id: insertedId.toString() } as DbEntity : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  const createMany = async(entityName: string, inputs: DbInput[]): Promise<DbEntity[]> => {
    try {
      const { insertedIds, insertedCount } =  await db.collection(entityName).insertMany(inputs)
      return (insertedCount > 0)
        ? inputs.map((inp: DbInput, index: number) => ({ ...inp, id: insertedIds[index].toString() } as DbEntity))
        : []
    } catch (error) {
      console.log('Error in db adapter:', error)
      return []
    }
  }

  const readOne = async(entityName: string, query: DbQuery): Promise<DbEntity | null> => {
    try {
      const entityDb = await db.collection(entityName).findOne(mapQueryIdToMongodb(query))
      return (entityDb)
        ? mapEntityIdFromMongodb(entityDb)
        : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  const readMany = async(entityName: string, query: DbQuery): Promise<DbEntity[]> => {
    try {
      const entities = await db.collection(entityName).find(mapQueryIdToMongodb(query)).toArray()
      return entities.map((ent: Document) => (mapEntityIdFromMongodb(ent)))
    } catch (error) {
      console.log('Error in db adapter:', error)
      return []
    }
  }

  const updateOne = async(entityName: string, query: DbQuery, input: DbInput): Promise<DbEntity | null> => {
    try {
      const { value } = await db.collection(entityName).findOneAndUpdate(mapQueryIdToMongodb(query), { $set: input })
      return (value)
        ? mapEntityIdFromMongodb(value)
        : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  const deleteOne = async(entityName: string, query: DbQuery): Promise<DbEntity | null> => {
    try {
      const { value } = await db.collection(entityName).findOneAndDelete(mapQueryIdToMongodb(query))
      return (value)
        ? mapEntityIdFromMongodb(value)
        : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  return {
    createOne,
    createMany,
    readOne,
    readMany,
    updateOne,
    deleteOne,
  }
}
