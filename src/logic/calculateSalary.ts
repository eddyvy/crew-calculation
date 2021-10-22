import type { SalaryCalculation, SalaryTableType } from '../salaryTable/SalaryTableType'
import type { Airport, FlightType } from '../flight/FlightType'
import type { EventType } from '../event/EventType'

export const calculateSalary = (
  salaryTable: SalaryTableType,
  flights: FlightType[],
  events: EventType[],
  startMonthTime: Date,
  endMonthTime: Date
): SalaryCalculation => {
  const {
    base,
    extraFlightTimeThreshold,
    extraFlightTimeAmount,
    standby,
    office,
    freeDayLost,
    trainingHour,
    trainingHourCRM,
    plusSCC,
    plusSpecialFlight,
    plusBackBase,
    dietNational,
    dietInternational,
    dietNationalNoSleep,
    dietInternationalNoSleep,
  } = salaryTable

  const inHours = (ms: number): number => ms / (1000 * 60 * 60)
  const inDays = (ms: number): number => inHours(ms) / 24

  //  extraFlightTimeThreshold, extraFlightTimeAmount
  const flightTimes = flights.map((flight: FlightType) => (flight.landing.valueOf() - flight.takeOff.valueOf()))
  const monthFlightTime = flightTimes.reduce((prev: number, acc: number) => prev + acc, 0)
  const extraHours = (inHours(monthFlightTime) - extraFlightTimeThreshold)
  const totalFT = (extraHours > 0) ? extraHours * extraFlightTimeAmount : 0

  // standby, office, freeDayLost
  const totalSB = events.filter((ev: EventType) => ev.type === 'standby').length * standby
  const totalOffice = office ? events.filter((ev: EventType) => ev.type === 'office').length * office : 0
  const totalFreeLost = freeDayLost ? events.filter((ev: EventType) => ev.type === 'freeDayLost').length * freeDayLost : 0

  // trainingHour
  const trainingEvents = events.filter((ev: EventType) => ev.type === 'training')
  const trainingTimes = trainingEvents.map((ev: EventType) => (ev.eventFinish.valueOf() - ev.eventStart.valueOf()))
  const monthTrainingHours = trainingTimes.reduce((prev: number, acc: number) => prev + acc, 0)
  const totalTH = trainingHour ? inHours(monthTrainingHours) * trainingHour : 0

  // trainingHourCRM
  const trainingCrmEvents = events.filter((ev: EventType) => ev.type === 'trainingCrm')
  const trainingCrmTimes = trainingCrmEvents.map((ev: EventType) => (ev.eventFinish.valueOf() - ev.eventStart.valueOf()))
  const monthTrainingCrmHours = trainingCrmTimes.reduce((prev: number, acc: number) => prev + acc, 0)
  const totalTHCrm = trainingHourCRM ? inHours(monthTrainingCrmHours) * trainingHourCRM : 0

  // PlusSCC, PlussSp
  const totalSCC = plusSCC ? flights.filter((fl: FlightType) => fl.role === 'SCC').length * plusSCC : 0
  const totalSpF = plusSpecialFlight ? flights.filter((fl: FlightType) => fl.role === 'Special').length * plusSpecialFlight : 0

  // PlusBackBase
  const flightsBB = flights.filter((fl: FlightType) => fl.role === 'BackBase')
  const totalPlusBB = plusBackBase ? flightsBB.length * plusBackBase : 0

  // Diets
  const whereIs = (ai: Airport) => (ai.isBase) ? 'base' : (ai.isNational) ? 'national' : 'international'
  const monthDays = inDays(endMonthTime.valueOf() - startMonthTime.valueOf())

  const daysData = (flights.length > 0) ? [ ...Array(monthDays) ].map(( n, day: number) => {
    const dayStart = startMonthTime.valueOf() + day * (1000 * 60 * 60 * 24)
    const dayEnd = startMonthTime.valueOf() + (day + 1) * (1000 * 60 * 60 * 24)

    const nextFl = flights.find((fl: FlightType) => (fl.takeOff.valueOf() > dayStart))
    const grWhere = nextFl ? whereIs(nextFl.departure) : whereIs(flights[flights.length - 1].destination)

    const todayFlights = flights.filter((fl: FlightType) => (
      (dayStart < fl.takeOff.valueOf() && fl.takeOff.valueOf() < dayEnd)
      || (dayStart < fl.landing.valueOf() && fl.landing.valueOf() < dayEnd)
    ))

    const sleepIn = (todayFlights.length === 0)
      ? grWhere
      : whereIs(todayFlights[todayFlights.length - 1].destination)

    const haveBeenAll = todayFlights.map((fl: FlightType) => {
      if (
        whereIs(fl.departure) === 'international'
        || whereIs(fl.destination) === 'international'
      ) return 'international'
      if (
        whereIs(fl.departure) === 'national'
        || whereIs(fl.destination) === 'national'
      ) return 'national'
      return 'base'
    })

    const haveBeenIn = haveBeenAll.includes('international')
      ? 'international'
      : haveBeenAll.includes('national')
        ? 'national'
        : haveBeenAll.includes('base')
          ? 'base'
          : grWhere

    return {
      sleepIn,
      haveBeenIn,
    }
  }) : []

  const diets = daysData.map(({
    sleepIn,
    haveBeenIn,
  }) => {
    if (sleepIn === 'international') return 'dietInternational'
    if (haveBeenIn === 'international') return 'dietInternationalNoSleep'
    if (sleepIn === 'national') return 'dietNational'
    if (haveBeenIn === 'national') return 'dietNationalNoSleep'
    return 'base'
  })

  const totalNatD = dietNational
    ? diets.filter((d: string) => d === 'dietNational').length * dietNational
    : 0
  const totalIntD = dietInternational
    ? diets.filter((d: string) => d === 'dietInternational').length * dietInternational
    : 0
  const totalNatNSD = dietNationalNoSleep
    ? diets.filter((d: string) => d === 'dietNationalNoSleep').length * dietNationalNoSleep
    : 0
  const totalIntNSD = dietInternationalNoSleep
    ? diets.filter((d: string) => d === 'dietInternationalNoSleep').length * dietInternationalNoSleep
    : 0

  const total = base
    + totalFT
    + totalSB
    + totalOffice
    + totalFreeLost
    + totalTH
    + totalTHCrm
    + totalSCC
    + totalSpF
    + totalPlusBB
    + totalNatD
    + totalIntD
    + totalNatNSD
    + totalIntNSD


  return {
    base,
    totalFT,
    totalSB,
    totalOffice,
    totalFreeLost,
    totalTH,
    totalTHCrm,
    totalSCC,
    totalSpF,
    totalPlusBB,
    totalNatD,
    totalIntD,
    totalNatNSD,
    totalIntNSD,
    total,
  }

}
