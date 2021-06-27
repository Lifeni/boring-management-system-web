import { writable } from 'svelte/store'
import { collegeModel, modalModel, toastModel, userModel } from './models'

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
        id: data.userId.toString(),
        name: data.userName,
        role: {
          id: data.roleId.toString(),
          name: data.roleName
        }
      }),
    logout: () => set(userModel)
  }
}

export const userInfo = createUserInfo()

const createCollegeList = () => {
  const { subscribe, set } = writable([collegeModel])

  return {
    subscribe,
    create: (data: Array<ICollegeResponse>) =>
      set(
        data.map((d) => ({
          id: d.collegeId.toString(),
          name: d.collegeName
        }))
      )
  }
}

export const collegeList = createCollegeList()

const createToast = () => {
  const { subscribe, set } = writable(toastModel)

  return {
    subscribe,
    open: (data: Toast) => set({ ...data, isOpen: true }),
    close: () => set(toastModel)
  }
}

export const toast = createToast()

export const createModal = (): ModalStore => {
  const { subscribe, set, update } = writable<Modal>(modalModel)

  return {
    subscribe,
    toggle: () => update((v) => ({ isOpen: !v.isOpen })),
    open: (type?: string, color?: Colors) => set({ isOpen: true, type, color }),
    close: () => set(modalModel)
  }
}

export const headerText = writable('一个教务管理系统')

export const isLoading = writable(true)
