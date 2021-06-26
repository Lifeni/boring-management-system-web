import { isLogged, userInfo } from '../stores/writable'
import { get } from './fetch'

export const checkAuth = async (): Promise<void> => {
  get<IDataMessage<IUserResponse>>('/api/auth/')
    .then((res) => {
      isLogged.login()
      userInfo.login(res.data)
    })
    .catch(() => {
      isLogged.logout()
      userInfo.logout()
    })
}
