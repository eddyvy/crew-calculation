import type { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import { FlightTypeDefs } from '../flight/FlightType'
import { flightResolver } from '../flight/flightResolver'
import { SalaryTableTypeDefs } from '../salaryTable/SalaryTableType'
import { salaryTableResolver } from '../salaryTable/salaryTableResolver'
import { ScheduleTypeDefs } from '../schedule/ScheduleType'
import { ScheduleResolver } from '../schedule/ScheduleResolver'
import { UserTypeDefs } from '../user/UserType'
import { userResolver } from '../user/userResolver'

export const schema = (crudAdapter: CrudAdapter): GraphQLSchema => {

  const typeDefs = mergeTypeDefs([
    FlightTypeDefs,
    SalaryTableTypeDefs,
    ScheduleTypeDefs,
    UserTypeDefs,
  ])

  const resolvers = mergeResolvers([
    flightResolver(crudAdapter),
    salaryTableResolver(crudAdapter),
    ScheduleResolver,
    userResolver(crudAdapter),
  ])

  return mergeSchemas({
    typeDefs,
    resolvers,
  })
}
