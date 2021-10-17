import { DbEntity, DbQuery } from './CrudAdapaterType'

export type BetweenValuesField = {
  field: string
  min: any
  max: any
}

export type ReadBetweenValues = (
  entityName: string,
  baseQuery: DbQuery,
  ...betweenValuesFields: BetweenValuesField[]
) => Promise<DbEntity[]>

export type SpecificCrudAdapter = {
  readBetweenValues: ReadBetweenValues
}
