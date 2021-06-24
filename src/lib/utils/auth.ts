import { goto } from '$app/navigation'
import { get } from './fetch'
import { isLogged, userInfo } from './stores'

export const checkAuth = async (): Promise<boolean> =>
  get<IDataMessage<IUserResponse>>('/api/auth/')
    .then((res) => {
      isLogged.login()
      userInfo.login(res.data)
      return true
    })
    .catch(() => {
      isLogged.logout()
      userInfo.logout()
      goto('/')
      return false
    })
