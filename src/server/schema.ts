import type { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import { FlightTypeDefs } from '../flight/FlightType'
import { flightResolver } from '../flight/flightResolver'
import { SalaryTableTypeDefs } from '../salaryTable/SalaryTableType'
import { salaryTableResolver } from '../salaryTable/salaryTableResolver'
import { EventTypeDefs } from '../event/EventType'
import { eventResolver } from '../event/eventResolver'
import { UserTypeDefs } from '../user/UserType'
import { userResolver } from '../user/userResolver'

export const schema = (crudAdapter: CrudAdapter): GraphQLSchema => {

  const typeDefs = mergeTypeDefs([
    FlightTypeDefs,
    SalaryTableTypeDefs,
    EventTypeDefs,
    UserTypeDefs,
  ])

  const resolvers = mergeResolvers([
    flightResolver(crudAdapter),
    salaryTableResolver(crudAdapter),
    eventResolver(crudAdapter),
    userResolver(crudAdapter),
  ])

  return mergeSchemas({
    typeDefs,
    resolvers,
  })
}
