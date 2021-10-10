export type CrudAdapter = {
  createOne?:   <E>(entityName: string, entity: E)              => Promise<Record<string, any> | null>
  createMany?:  <E>(entityName: string, entities: E[])          => Promise<Record<string, any>[] | null>
  readOne?:     <Q>(entityName: string, query: Q)               => Promise<Record<string, any> | null>
  readMany?:    <Q>(entityName: string, query: Q)               => Promise<Record<string, any>[] | null>
  updateOne?:   <E, Q>(entityName: string, query: Q, entity: E) => Promise<Record<string, any> | null>
  deleteOne?:   <Q>(entityName: string, query: Q)               => Promise<Record<string, any> | null>
}
