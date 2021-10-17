import { CrudAdapterBasic, DbEntity } from '../database/CrudAdapaterType'
import { BetweenValuesField, ReadBetweenValues, SpecificCrudAdapter } from '../database/SpecificCrudAdapterType'
import { MongodbQuery } from './mongodbAdapter'

export const mongodbSpecificAdapter = (mongoCrud: CrudAdapterBasic): SpecificCrudAdapter => {

  const readBetweenValues: ReadBetweenValues = async(
    entityName: string,
    baseQuery: MongodbQuery,
    ...betweenValuesFields: BetweenValuesField[]
  ): Promise<DbEntity[]> => {
    const queries = betweenValuesFields.map(({ field, min, max }: BetweenValuesField) => {
      const subQueryMin = {} as MongodbQuery
      subQueryMin[field] = { $gte: min }

      const subQueryMax = {} as MongodbQuery
      subQueryMax[field] = { $lte: max }

      return { $and: [ subQueryMin, subQueryMax ] }
    })
    const query = (baseQuery.$or)
      ? { ...baseQuery, $or: [ ...baseQuery.$or, ...queries ] } as MongodbQuery
      : { ...baseQuery, $or: queries } as MongodbQuery

    return await mongoCrud.readMany(entityName, query)
  }

  return {
    readBetweenValues,
  }
}
