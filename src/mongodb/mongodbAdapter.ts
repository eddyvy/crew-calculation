import type { MongoClient } from 'mongodb'
import type { CrudAdapter } from '../common/types'

export const mongodbAdapter = (client: MongoClient, DB_NAME: string): CrudAdapter => {
  const db = client.db(DB_NAME)

  const createOne = async<E>(entityName: string, entity: E): Promise<any | null> => {
    try {
      const { acknowledged } = await db.collection(entityName).insertOne(entity)
      return (acknowledged) ? entity : null
    } catch (error) {
      console.log('Error creating:', error)
      return null
    }
  }

  const createMany = async<E>(entityName: string, entities: E[]): Promise<any[] | null> => {
    try {
      const { acknowledged } =  await db.collection(entityName).insertMany(entities)
      return (acknowledged) ? entities : null
    } catch (error) {
      console.log('Error creating:', error)
      return null
    }
  }

  const readOne = async<Q>(entityName: string, query: Q): Promise<any | null> => {
    try {
      return await db.collection(entityName).findOne(query)
    } catch (error) {
      console.log('Error reading:', error)
      return null
    }
  }

  const readMany = async<Q>(entityName: string, query: Q): Promise<any[] | null> => {
    try {
      return [ await db.collection(entityName).find(query) ]
    } catch (error) {
      console.log('Error reading:', error)
      return null
    }
  }

  const updateOne = async<E, Q>(entityName: string, query: Q, entity: E): Promise<any | null> => {
    try {
      return await db.collection(entityName).updateOne(query, entity)
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
