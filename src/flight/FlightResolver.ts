import { FlightType } from './FlightType'

const getFlight = (): FlightType => ({
  id: 1,
  takeOff: new Date(2021, 1, 1, 12),
  landing: new Date(2021, 1, 1, 13),
  departure: {
    id: 1,
    code: 'MAD',
    isBase: true,
    isNational: true,
  },
  destination: {
    id: 2,
    code: 'PUJ',
    isBase: false,
    isNational: false,
  },
})

export const FlightResolver = {
  Query: {
    flight: getFlight,
  },
}
