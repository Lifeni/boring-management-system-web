import { writable } from 'svelte/store'
import { User } from './modelss'

export const user = writable(User)
