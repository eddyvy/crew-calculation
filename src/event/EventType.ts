import { gql } from 'apollo-server-express'

export type EventEnumType = 'standby'
  | 'office'
  | 'freeDayLost'
  | 'training'
  | 'trainingCrm'
  | 'reserve'
  | 'rest'
  | 'free'

export type EventType = {
  id: number
  ownerId: number
  eventStart: Date
  eventFinish: Date
  type: EventEnumType
}

export type EventInput = {
  eventStart: Date
  eventFinish: Date
  type: EventEnumType
}

export const EventTypeDefs = gql`
  type Query {
    getEventById(eventId: ID): Event
    getEventsByDateTimeInterval(startTime: Float, endTime: Float): [Event]
  }

  type Mutation {
    createEvent(eventInput: EventInput): Event
    deleteEventById(eventId: ID): Event
    updateEventById(eventId: ID, eventInput: EventInput): Event
  }

  type Event {
    id: ID!
    ownerId: ID!
    eventStart: Float!
    eventFinish: Float!
    type: EventEnumType!
  }

  input EventInput {
    eventStart: Float!
    eventFinish: Float!
    type: EventEnumType!
  }

  enum EventEnumType {
    standby
    office
    freeDayLost
    training
    trainingCrm
    reserve
    rest
    free
  }
`
