import { Document, Filter, MongoClient, ObjectId } from 'mongodb'
import type {
  CreateMany,
  CreateOne,
  CrudAdapter,
  CrudAdapterBasic,
  DbEntity,
  DbInput,
  DbQuery,
  DeleteMany,
  DeleteOne,
  ReadMany,
  ReadOne,
  UpdateMany,
  UpdateOne
} from '../database/CrudAdapaterType'
import { mongodbSpecificAdapter } from './mongodbSpecificAdapter'
import { SpecificCrudAdapter } from '../database/SpecificCrudAdapterType'

export type MongodbQuery = Filter<DbEntity>

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

  const createOne: CreateOne = async(entityName: string, input: DbInput): Promise<DbEntity | null> => {
    try {
      const { insertedId } = await db.collection(entityName).insertOne(input)

      return (insertedId) ? { ...input, id: insertedId.toString() } as DbEntity : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  const createMany: CreateMany = async(entityName: string, inputs: DbInput[]): Promise<DbEntity[]> => {
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

  const readOne: ReadOne = async(entityName: string, query: DbQuery): Promise<DbEntity | null> => {
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

  const readMany: ReadMany = async(entityName: string, query: DbQuery): Promise<DbEntity[]> => {
    try {
      const dbEntities = await db.collection(entityName).find(mapQueryIdToMongodb(query)).toArray()

      return dbEntities.map((ent: Document) => (mapEntityIdFromMongodb(ent)))
    } catch (error) {
      console.log('Error in db adapter:', error)
      return []
    }
  }

  const updateOne: UpdateOne = async(entityName: string, query: DbQuery, input: DbInput): Promise<DbEntity | null> => {
    try {
      const { value } = await db.collection(entityName).findOneAndUpdate(
        mapQueryIdToMongodb(query),
        { $set: input },
        { upsert: false }
      )

      return (value)
        ? mapEntityIdFromMongodb(value)
        : null
    } catch (error) {
      console.log('Error in db adapter:', error)
      return null
    }
  }

  const updateMany: UpdateMany = async(entityName: string, query: DbQuery, input: DbInput): Promise<DbEntity[]> => {
    try {
      const mappedQuery = mapQueryIdToMongodb(query)
      const { matchedCount } = await db.collection(entityName).updateMany(
        mappedQuery,
        { $set: input },
        { upsert: false }
      )

      return (matchedCount > 0)
        ? readMany(entityName, { ...mappedQuery, ...input })
        : []
    } catch (error) {
      console.log('Error in db adapter:', error)
      return []
    }
  }

  const deleteOne: DeleteOne = async(entityName: string, query: DbQuery): Promise<DbEntity | null> => {
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

  const deleteMany: DeleteMany = async(entityName: string, query: DbQuery): Promise<DbEntity[]> => {
    try {
      const mappedQuery = mapQueryIdToMongodb(query)
      const entities = await readMany(entityName, mappedQuery)
      const { deletedCount } = await db.collection(entityName).deleteMany(mappedQuery)

      return (deletedCount > 0)
        ? entities
        : []
    } catch (error) {
      console.log('Error in db adapter:', error)
      return []
    }
  }

  const mongoCrud: CrudAdapterBasic = {
    createOne,
    createMany,
    readOne,
    readMany,
    updateOne,
    updateMany,
    deleteOne,
    deleteMany,
  }

  const mongoSpecificCrud: SpecificCrudAdapter = mongodbSpecificAdapter(mongoCrud)

  return { ...mongoCrud, ...mongoSpecificCrud }
}
