import type { GraphQLSchema } from 'graphql/type/schema'
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import { EventTypeDefs } from '../event/EventType'
import { eventResolver } from '../event/eventResolver'
import { FlightTypeDefs } from '../flight/FlightType'
import { flightResolver } from '../flight/flightResolver'
import { SalaryTableTypeDefs } from '../salaryTable/SalaryTableType'
import { salaryTableResolver } from '../salaryTable/salaryTableResolver'
import { ServiceTypeDefs } from '../service/ServiceType'
import { serviceResolver } from '../service/serviceResolver'
import { UserTypeDefs } from '../user/UserType'
import { userResolver } from '../user/userResolver'

export const schema = (crudAdapter: CrudAdapter): GraphQLSchema => {

  const typeDefs = mergeTypeDefs([
    EventTypeDefs,
    FlightTypeDefs,
    SalaryTableTypeDefs,
    ServiceTypeDefs,
    UserTypeDefs,
  ])

  const resolvers = mergeResolvers([
    eventResolver(crudAdapter),
    flightResolver(crudAdapter),
    salaryTableResolver(crudAdapter),
    serviceResolver(crudAdapter),
    userResolver(crudAdapter),
  ])

  return mergeSchemas({
    typeDefs,
    resolvers,
  })
}
