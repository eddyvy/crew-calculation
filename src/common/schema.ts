import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge'
import { mergeSchemas } from '@graphql-tools/schema'
import { FlightTypeDefs } from '../flight/FlightType'
import { FlightResolver } from '../flight/FlightResolver'
import { SalaryTableTypeDefs } from '../salaryTable/SalaryTableType'
import { SalaryTableResolver } from '../salaryTable/SalaryTableResolver'
import { ScheduleTypeDefs } from '../schedule/ScheduleType'
import { ScheduleResolver } from '../schedule/ScheduleResolver'
import { UserTypeDefs } from '../user/UserType'
import { UserResolver } from '../user/UserResolver'

const typeDefs = mergeTypeDefs([
  FlightTypeDefs,
  SalaryTableTypeDefs,
  ScheduleTypeDefs,
  UserTypeDefs,
])

const resolvers = mergeResolvers([
  FlightResolver,
  SalaryTableResolver,
  ScheduleResolver,
  UserResolver,
])

export default mergeSchemas({
  typeDefs,
  resolvers,
})
