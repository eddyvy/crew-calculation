import { writable } from 'svelte/store'
import { createClient } from './client/createClient'

const lsExists = (typeof localStorage !== 'undefined')
const storedToken = lsExists ? localStorage.getItem('authorization') : ''
const newClient = createClient().setHeader('authorization', storedToken)

export const token = writable(storedToken)
export const client = writable(newClient)

// check for localStorage, this won't run on SSR
if (lsExists) {
  token.subscribe((tok) => {
    localStorage.setItem('authorization', tok ? tok : '')
    client.set(newClient.setHeader('authorization', tok))
  })
}
