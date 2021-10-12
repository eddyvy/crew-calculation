export type CrudAdapter = {
  createOne:   <I, E>(entityName: string, input: I)            => Promise<E | null>
  createMany:  <I, E>(entityName: string, entities: I[])       => Promise<E[] | null>
  readOne:     <Q>(entityName: string, query: Q)               => Promise<any | null>
  readMany:    <Q>(entityName: string, query: Q)               => Promise<any[] | null>
  updateOne:   <E, Q>(entityName: string, query: Q, entity: E) => Promise<E | null>
  deleteOne:   <Q>(entityName: string, query: Q)               => Promise<any | null>
}

export type EntityType = {
  name: string
  uniqueKey: string | null
}

export type Me = {
  _id: string
  name: string
  email: string
}
