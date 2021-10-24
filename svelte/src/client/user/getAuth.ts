import { GraphQLClient, gql } from 'graphql-request'

export const getAuth = async(email: string, password: string, client: GraphQLClient): Promise<string> => {
  const query = gql`
    query GetAuth($email: String, $password: String) {
      authUser(email: $email, password: $password)
    }
  `

  try {
    const data = await client.request(query, {
      email,
      password,
    })

    return data.authUser
  } catch (err) {
    console.log('Error at getAuth: ', err)
    return ''
  }
}
