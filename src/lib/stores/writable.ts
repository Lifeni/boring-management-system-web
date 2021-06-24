import { writable } from 'svelte/store'
import { toastModel, userModel } from './models'

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

const createToast = () => {
  const { subscribe, set } = writable(toastModel)

  return {
    subscribe,
    open: (data: Toast) => set(data),
    close: () => set(toastModel)
  }
}

export const toast = createToast()

export const headerText = writable('一个教务管理系统')
