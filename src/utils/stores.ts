import { writable } from 'svelte/store'
import { User } from './models'

export const user = writable(User)
