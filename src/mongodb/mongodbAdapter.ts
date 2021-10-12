import type { MongoClient } from 'mongodb'
import type { CrudAdapter } from '../common/types'

export const mongodbAdapter = (client: MongoClient, DB_NAME: string): CrudAdapter => {
  const db = client.db(DB_NAME)

  const createOne = async<I, E>(entityName: string, input: I): Promise<E | null> => {
    try {
      const { insertedId } = await db.collection(entityName).insertOne(input)
      return (insertedId) ? { _id: insertedId.toString(), ...input } as unknown as E : null
    } catch (error) {
      console.log('Error creating:', error)
      return null
    }
  }

  const createMany = async<I, E>(entityName: string, inputs: I[]): Promise<E[] | null> => {
    try {
      const { insertedIds, insertedCount } =  await db.collection(entityName).insertMany(inputs)
      return (insertedCount > 0)
        ? inputs.map( (inp: I, index: number) => ({ _id: insertedIds[index].toString(), ...inp } as unknown as E))
        : null
    } catch (error) {
      console.log('Error creating:', error)
      return null
    }
  }

  const readOne = async<Q, E>(entityName: string, query: Q): Promise<E | null> => {
    try {
      const entityDb = await db.collection(entityName).findOne(query)
      return (entityDb)
        ? { _id: entityDb._id.toString(), ...entityDb } as unknown as E
        : null
    } catch (error) {
      console.log('Error reading:', error)
      return null
    }
  }

  const readMany = async<Q, E>(entityName: string, query: Q): Promise<E[]> => {
    try {
      const entities = await db.collection(entityName).find(query).toArray()
      return entities.map((doc) => doc as E)
    } catch (error) {
      console.log('Error reading:', error)
      return []
    }
  }

  const updateOne = async<Q, I, E>(entityName: string, query: Q, input: I): Promise<E | null> => {
    try {
      const { value } = await db.collection(entityName).findOneAndUpdate(query, { $set: input })
      return value && value as E
    } catch (error) {
      console.log('Error reading:', error)
      return null
    }
  }

  const deleteOne = async<Q>(entityName: string, query: Q): Promise<any | null> => {
    try {
      return await db.collection(entityName).deleteOne(query)
    } catch (error) {
      console.log('Error reading:', error)
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
