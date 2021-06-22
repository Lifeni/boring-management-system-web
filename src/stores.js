import { writable } from 'svelte/store'

export const user = writable({ isLogged: false, userInfo: { id: null, role: null } })
