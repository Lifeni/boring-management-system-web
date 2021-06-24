import { writable } from 'svelte/store'
import { userModel } from './models'

const createIsLogged = () => {
  const { subscribe, set } = writable(false)

  return {
    subscribe,
    login: () => set(true),
    logout: () => set(false)
  }
}

export const isLogged = createIsLogged()

const createUserInfo = () => {
  const { subscribe, set } = writable(userModel)

  return {
    subscribe,
    login: (data: IUserResponse) =>
      set({
        id: data.userId,
        role: data.role,
        name: data.userName
      }),
    logout: () => set(userModel)
  }
}

export const userInfo = createUserInfo()
