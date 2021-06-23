import { writable } from 'svelte/store'
import { userModel } from './models'

export const isLogged = writable(false)
export const userInfo = writable(userModel)
