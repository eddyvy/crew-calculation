import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/DbTypes'
import { sendRecoverPasswordEmail } from './action/sendRecoverPasswordEmail'
import { authUser } from './action/authUser'
import { createUser } from './action/createUser'
import { updatePassword } from './action/updatePassword'
import { updateUser } from './action/updateUser'

export const userResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne } = crudAdapter

  const useUserResolvers = async(parent: any, args: any, context: any, info: any) => {
    switch (info.fieldName) {
      case 'authUser':
        return await authUser(args.email, args.password, readOne)
      case 'sendRecoverPasswordEmail':
        return await sendRecoverPasswordEmail(args.email, readOne)
      case 'createUser':
        return await createUser(args.newUser, args.password, createOne)
      case 'updatePassword':
        return (context.me)
          ? await updatePassword(context.me.email, args.oldPassword, args.newPassword, readOne, updateOne)
          : null
      case 'updateUser':
        return (context.me)
          ? await updateUser(args.updatedUser, context.me.id, updateOne)
          : null
    }
  }

  return {
    Query: {
      authUser: useUserResolvers,
      sendRecoverPasswordEmail: useUserResolvers,
    },
    Mutation: {
      createUser: useUserResolvers,
      updatePassword: useUserResolvers,
      updateUser: useUserResolvers,
    },
  }
}

