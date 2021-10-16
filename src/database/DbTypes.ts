export type DbEntity = Record<string, unknown>
export type DbInput = Partial<DbEntity>
export type DbQuery = Partial<DbEntity>

export type CreateOne = (entityName: string, input: DbInput) => Promise<DbEntity | null>
export type CreateMany = (entityName: string, inputs: DbInput[]) => Promise<DbEntity[]>
export type ReadOne = (entityName: string, query: DbQuery) => Promise<DbEntity | null>
export type ReadMany = (entityName: string, query: DbQuery) => Promise<DbEntity[]>
export type UpdateOne = (entityName: string, query: DbQuery, input: DbInput) => Promise<DbEntity | null>
export type DeleteOne = (entityName: string, query: DbQuery) => Promise<DbEntity | null>

export type CrudAdapter = {
  createOne: CreateOne
  createMany: CreateMany
  readOne: ReadOne
  readMany: ReadMany
  updateOne: UpdateOne
  deleteOne: DeleteOne
}

export type EntityPropsType = {
  name: string
  uniqueKey: string | null
}
