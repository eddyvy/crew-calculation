import { MongodbQuery } from '../mongodb/mongodbAdapter'
import { SpecificCrudAdapter } from './SpecificCrudAdapterType'

export type DbEntity = Record<string, any>
export type DbInput = Partial<DbEntity>
export type DbQuery = MongodbQuery // | SqlQuery | MysqlQuery | PostgresQuery | ...

export type CreateOne = (entityName: string, input: DbInput) => Promise<DbEntity | null>
export type CreateMany = (entityName: string, inputs: DbInput[]) => Promise<DbEntity[]>
export type ReadOne = (entityName: string, query: DbQuery) => Promise<DbEntity | null>
export type ReadMany = (entityName: string, query: DbQuery) => Promise<DbEntity[]>
export type UpdateOne = (entityName: string, query: DbQuery, input: DbInput) => Promise<DbEntity | null>
export type UpdateMany = (entityName: string, query: DbQuery, input: DbInput) => Promise<DbEntity[]>
export type DeleteOne = (entityName: string, query: DbQuery) => Promise<DbEntity | null>
export type DeleteMany = (entityName: string, query: DbQuery) => Promise<DbEntity[]>

export type CrudAdapterBasic = {
  createOne: CreateOne
  createMany: CreateMany
  readOne: ReadOne
  readMany: ReadMany
  updateOne: UpdateOne
  updateMany: UpdateMany
  deleteOne: DeleteOne
  deleteMany: DeleteMany
}

export type CrudAdapter = CrudAdapterBasic & SpecificCrudAdapter
