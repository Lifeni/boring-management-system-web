import { isLogged, toast, userInfo } from '../stores/writable'
import { get } from './fetch'

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
      toast.open({
        title: '发生了什么？',
        body: '不用担心，只是登录失效了，再来一次就好了',
        isOpen: true
      })
      return false
    })
