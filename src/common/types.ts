export type CreateOne = <I, E>(entityName: string, input: I) => Promise<E | null>
export type CreateMany = <I, E>(entityName: string, entities: I[]) => Promise<E[] | null>
export type ReadOne = <Q, E>(entityName: string, query: Q) => Promise<E | null>
export type ReadMany = <Q, E>(entityName: string, query: Q) => Promise<E[]>
export type UpdateOne = <Q, I, E>(entityName: string, query: Q, input: I) => Promise<E | null>
export type DeleteOne = <Q>(entityName: string, query: Q) => Promise<any | null>

export type CrudAdapter = {
  createOne: CreateOne
  createMany: CreateMany
  readOne: ReadOne
  readMany: ReadMany
  updateOne: UpdateOne
  deleteOne: DeleteOne
}

export type MeType = {
  _id: string
  name: string
  email: string
}

export type EntityType = {
  name: string
  uniqueKey: string | null
}

export type AppEntities = {
  FLIGHTS: EntityType
  SALARY_TABLES: EntityType
  SCHEDULES: EntityType
  USERS: EntityType
}
