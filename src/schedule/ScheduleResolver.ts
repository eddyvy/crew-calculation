import { ScheduleType } from './ScheduleType'

const getSchedule = (): ScheduleType => ({
  id: 1,
  month: 9,
  flights: [
    {
      id: 'HashForFlight1',
      ownerId: 'HashForOwnerId1',
      takeOff: new Date(2021, 1, 1, 12),
      landing: new Date(2021, 1, 1, 13),
      departure: {
        code: 'MAD',
        isBase: true,
        isNational: true,
      },
      destination: {
        code: 'PUJ',
        isBase: false,
        isNational: false,
      },
    },
  ],
  standby: [ new Date(2021, 1, 1) ],
  reserve: [ new Date(2021, 1, 2) ],
  calculation: 2000,
})

export const ScheduleResolver = {
  Query: {
    schedule: getSchedule,
  },
}
