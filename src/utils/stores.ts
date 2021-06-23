import { writable } from 'svelte/store'
import { userModel } from './models'

export const user = writable(userModel)
