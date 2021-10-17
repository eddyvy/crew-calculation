import { DB_ENTITIES, SALT_ROUNDS } from '../../src/common/constants'

describe('Constants', () => {

  test('DB_ENTITES values should be as expected', () => {
    expect(DB_ENTITIES).toEqual({
      FLIGHTS: {
        name: 'flights',
        uniqueKey: null,
      },
      SALARY_TABLES: {
        name: 'salaryTables',
        uniqueKey: null,
      },
      SCHEDULES: {
        name: 'events',
        uniqueKey: null,
      },
      USERS: {
        name: 'users',
        uniqueKey: 'email',
      },
    })
  })

  test('SALT_ROUNDS value should be as expected', () => {
    expect(SALT_ROUNDS).toBe(10)
  })
})
