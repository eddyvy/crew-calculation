import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import type { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { createEvent } from './action/createEvent'
import { getEventById } from './action/getEventById'
import { updateEventById } from './action/updateEventById'
import { deleteEventById } from './action/deleteEventById'
import { getEventsByDateTimeInterval } from './action/getEventsByDateTimeInterval'

export const eventResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne, deleteOne, readBetweenValues } = crudAdapter

  const useEventResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'getEventById':
        return await authRequired(
          context.me,
          getEventById,
          args.eventId,
          context.me?.id,
          readOne
        )
      case 'deleteEventById':
        return await authRequired(
          context.me,
          deleteEventById,
          args.eventId,
          context.me?.id,
          deleteOne
        )
      case 'createEvent':
        return await authRequired(
          context.me,
          createEvent,
          args.eventInput,
          context.me?.id,
          createOne
        )
      case 'updateEventById':
        return await authRequired(
          context.me,
          updateEventById,
          args.eventId,
          context.me?.id,
          args.eventInput,
          updateOne
        )
      case 'getEventsByDateTimeInterval':
        return await authRequired(
          context.me,
          getEventsByDateTimeInterval,
          args.startTime,
          args.endTime,
          context.me?.id,
          readBetweenValues
        )
    }
  }

  return {
    Query: {
      getEventById: useEventResolvers,
      getEventsByDateTimeInterval: useEventResolvers,
    },
    Mutation: {
      createEvent: useEventResolvers,
      deleteEventById: useEventResolvers,
      updateEventById: useEventResolvers,
    },
  }
}
