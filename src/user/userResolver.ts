import type { IResolvers } from '@graphql-tools/utils/Interfaces'
import type { CrudAdapter } from '../database/CrudAdapaterType'
import type { AppContext } from '../common/types'
import { authRequired } from '../validation/authRequired'
import { sendRecoverPasswordEmail } from './action/sendRecoverPasswordEmail'
import { authUser } from './action/authUser'
import { createUser } from './action/createUser'
import { updatePassword } from './action/updatePassword'
import { updateUser } from './action/updateUser'

export const userResolver = (crudAdapter: CrudAdapter): IResolvers => {

  const { createOne, readOne, updateOne } = crudAdapter

  const useUserResolvers = async(parent: any, args: any, context: AppContext, info: any) => {
    switch (info.fieldName) {
      case 'authUser':
        return await authUser(args.email, args.password, readOne)
      case 'sendRecoverPasswordEmail':
        return await sendRecoverPasswordEmail(args.email, readOne)
      case 'createUser':
        return await createUser(args.newUser, args.password, createOne)
      case 'updatePassword':
        return await authRequired(
          context.me,
          updatePassword,
          context.me?.email,
          args.oldPassword,
          args.newPassword,
          readOne,
          updateOne
        )
      case 'updateUser':
        return await authRequired(
          context.me,
          updateUser,
          args.updatedUser,
          context.me?.id,
          updateOne
        )
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

