import { UserType } from './UserType'

const getUser = (): UserType => ({
  id: 1,
  name: 'Ali',
  email: 'aplaza@example.com',
  company: 'Iberojet',
})

export const UserResolver = {
  Query: {
    user: getUser,
  },
}
