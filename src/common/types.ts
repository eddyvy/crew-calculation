export type CrudAdapter = {
  createOne:   <E>(entityName: string, entity: E)              => Promise<any | null>
  createMany:  <E>(entityName: string, entities: E[])          => Promise<any[] | null>
  readOne:     <Q>(entityName: string, query: Q)               => Promise<any | null>
  readMany:    <Q>(entityName: string, query: Q)               => Promise<any[] | null>
  updateOne:   <E, Q>(entityName: string, query: Q, entity: E) => Promise<any | null>
  deleteOne:   <Q>(entityName: string, query: Q)               => Promise<any | null>
}

export type EntityType = {
  name: string
  uniqueKey: string | null
}
